<?php

    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Session\Session;

    $app['twig'] = $app->share($app->extend('twig', function ($twig, $app) {
        $twig->addGlobal('user', $app['session']->get('user'));

        return $twig;
    }));

    /**
     * Homepage
     */
    $app->get('/', function () use ($app) {
        return $app['twig']->render('index.html', array('readme' => file_get_contents('README.md')));
    });

    /**
     * Login
     */
    $app->match('/login', function (Request $request) use ($app) {
        $username = $request->get('username');
        $password = $request->get('password');

        if ($username) {
            $sql  = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
            $user = $app['db']->fetchAssoc($sql);

            if ($user) {
                $app['session']->set('user', $user);
                return $app->redirect('/todo');
            }
        }

        return $app['twig']->render('login.html', array());
    });

    /**
     * Logout
     */
    $app->get('/logout', function () use ($app) {
        $app['session']->set('user', null);
        return $app->redirect('/');
    });

    /**
     * Display todo by ID
     */
    $app->get('/todo/{id}', function (Request $request) use ($app) {
        if (null === $user = $app['session']->get('user')) {
            return $app->redirect('/login');
        }

        $routeParam = $request->attributes->get('_route_params');
        $id         = $routeParam['id'];

        if ($id) {
            $sql  = "SELECT * FROM todos WHERE id = '$id'";
            $todo = $app['db']->fetchAssoc($sql);

            return $app['twig']->render('todo.html', array('todo' => $todo));
        } else {
            $sql   = "SELECT * FROM todos WHERE user_id = '${user['id']}'";
            $todos = $app['db']->fetchAll($sql);

            $page = $request->query->get('page');

            if ($todos && count($todos)) {
                $itemsPerPage = 5;
                $totalTodos   = count($todos);
                $pages        = $totalTodos > $itemsPerPage ? ceil($totalTodos / $itemsPerPage) : 1;
                $numberPages  = $pages > 1 ? range(1, $pages) : [1];

                $counter     = 0;
                $todosByPage = array();
                $pageSingle  = array();
                foreach ($todos as $todo) {
                    if ($counter < $itemsPerPage) {
                        $counter++;
                        array_push($pageSingle, $todo);
                    } else {
                        array_push($todosByPage, $pageSingle);
                        $counter    = 0;
                        $pageSingle = array();
                    }
                }
                if (count($pageSingle)) {
                    array_push($todosByPage, $pageSingle);
                }
                return $app['twig']->render('todos.html', array(
                        'todos' => $todosByPage[$page ? $page - 1 : 0],
                        'numberPages' => $numberPages)
                );
            }

            return $app['twig']->render('todos.html', array('todos' => $todos));
        }
    })
        ->value('id', null);

    /**
     * Add todo with description as required.
     */
    $app->post('/todo/add', function (Request $request) use ($app) {
        if (null === $user = $app['session']->get('user')) {
            return $app->redirect('/login');
        }

        $user_id       = $user['id'];
        $user_username = $user['username'];
        $description   = $request->get('description');
        $session       = new Session();

        if ($description) {
            $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
            if ($app['db']->executeUpdate($sql)) {
                $session->getFlashBag()->add('success', $user_username . 'added "' . $description . '"');
            }
        } else {
            $session = new Session();
            $session->getFlashBag()->add('danger', 'Description is required to add Todo.');
        }
        return $app->redirect('/todo');
    });

    /**
     * Delete todo by id
     */
    $app->match('/todo/delete/{id}', function ($id) use ($app) {
        $sql = "DELETE FROM todos WHERE id = '$id'";

        if ($app['db']->executeUpdate($sql)) {
            $session = new Session();
            $session->getFlashBag()->add('success', 'Todo No. ' . $id . ' is deleted');
        }

        return $app->redirect('/todo');
    });

    /**
     * Check the complete box by id.
     */
    $app->match('/todo/complete/{id}', function ($id) use ($app) {
        $sql = "UPDATE todos SET complete = NOT complete WHERE id = '$id'";
        $app['db']->executeUpdate($sql);

        return $app->redirect('/todo');
    });

    /**
     * Backend API Response
     * {"id":"1","user_id":"1","description":"Vivamus tempus","complete":null}
     */
    $app->get('/todo/{id}/json', function ($id) use ($app) {
        if (null === $user = $app['session']->get('user')) {
            return $app->redirect('/login');
        }

        if ($id) {
            $sql  = "SELECT * FROM todos WHERE id = '$id'";
            $todo = $app['db']->fetchAssoc($sql);

            $response = new Response();
            $response->setContent(json_encode($todo));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    })->value('id', null);