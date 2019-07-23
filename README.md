# Php-test-frontend

## Project Description

This application is the frontend focus, is for Task 6.
Due to the time, I don't have time to implement the JWT and login.

It is able to run alongside with the backend api. 

I did a little bit change to make it easier for you guys to test the page. 
Please just run the same command as the previous readme.

## Instruction
```sh
php composer.phar install
cp config/config.yml.dist config/config.yml
mysql -u root <database> < resources/database.sql
mysql -u root <database> < resources/fixtures.sql
mysql -u root <database> < resources/add_update_to_todos.sql
php -S localhost:1337 -t web/ web/index.php 
```
You can change the database connection from the file `config/config.yml`.

## Thanks for reviewing.