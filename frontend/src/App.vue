<template>
  <div id="app">
    <div class="container">
      <div class="description-input">
        <input v-model="description" placeholder="Your description..." />
        <button class="add-task-btn" v-on:click="addTodo">
          <span>+</span>
        </button>
      </div>
      <hr class="divider" />
      <div class="todo-body">
        <ul class="todo-container">
          <li
            class="todo-item"
            v-for="todo in tasks[page]"
            :class="`${todo.complete == 1 && 'checked'}`"
            v-bind:key="todo.id"
          >
            <p class="task">{{ todo.description }}</p>
            <input type="radio" v-on:click="checkTodo" :data-id="todo.id" />
          </li>
        </ul>
      </div>
      <ul class="pagination">
        <li
          v-for="(_,index) in tasks"
          v-bind:key="index"
          :class="`${page === index ? 'active' : ''}`"
          @click="()=>page = index"
        >{{index+1}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      tasks: [],
      description: "",
      page: 0
    };
  },
  created() {
    this.userId = 1;
    this.getTodoList();
  },
  methods: {
    addTodo() {
      const { description, userId } = this;
      if (description) {
        const input = description.trim();
        this.$http
          .post("/api/todo/add", { description: input, id: userId })
          .then(({ data: { data, success } }) => {
            if (success) {
              this.getTodoList();
              this.goToPage(this.tasks.length - 1);
            }
          });
      }
    },
    checkTodo(e) {
      const statusEl = e.target.parentNode;
      const { id } = e.target.dataset;
      if (id) {
        this.$http
          .post("/api/todo/complete", { userId: this.userId, id })
          .then(({ data: { data, success } }) => {
            //Should be update on the element need to be updated only.
            //Except the application is using on differernt devices. Might consider fetch all the data.
            if (success) {
              this.getTodoList();
              statusEl.classList.toggle("checked");
            }
          });
      }
    },
    getTodoList() {
      return this.$http.get("/api/todo").then(({ data }) => {
        if (data && data.length) {
          const result = [];
          for (var i = 0, len = data.length; i < len; i += 5) {
            result.push(data.slice(i, i + 5));
          }
          this.tasks = result;
        }
      });
    },
    goToPage(index) {
      this.page = index;
    }
  }
};
</script>

<style>
:root {
  --body-bkg: #f0efe9;
  --todo-bkg: #ffffff;
  --text-color: #5f6271;
  --text-unselected-color: #d7d7dc;
  --control-color: #50e3a4;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  background-color: var(--todo-bkg);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.18);
  height: 24em;
  padding: 2em;
  position: relative;
  width: 380px;
}

body {
  background-color: var(--body-bkg);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: var(--text-color);
}

.divider {
  border-top: 4px dotted #ccc;
  margin-top: 2rem;
  margin-bottom: 1.4rem;
}

ul {
  list-style: none;
}

p {
  margin: 0;
}

ul.pagination {
  position: absolute;
  margin-top: 4px;
  text-align: center;
  bottom: 8px;
  left: 115px;
}

ul.pagination li {
  display: inline-block;
  padding: 0 16px;
  cursor: pointer;
  transition: 300ms ease-in-out;
}

ul.pagination li.active {
  color: #fff;
  background: var(--control-color);
}

.description-input input {
  width: 100%;
  height: 2.5rem;
  font-size: 1.2rem;
  padding: 16px;
}

.description-input input::placeholder {
  color: #ddd;
}

.description-input span {
  font-size: 2em;
  font-weight: bold;
  color: #46be8b;
  font-family: none;
}

button.add-task-btn {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 3rem;
  outline: none;
  transition: 300ms ease-in-out;
}

button.add-task-btn span {
  font-size: 2.9em;
  font-weight: bold;
  color: #46be8b;
  font-family: none;
}

button.add-task-btn:active {
  transform: scale(0.6);
}

.todo-body .todo-container {
  overflow-y: auto;
  max-height: 260px;
}

.todo-body .todo-container li.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6em 0.2em;
}

li.todo-item.checked p {
  color: var(--text-unselected-color);
  text-decoration: line-through;
  transition: all 500ms ease-in-out;
}

li.todo-item.checked input {
  border-color: var(--control-color);
  transition: all 500ms ease-in-out;
}

input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  border: 3px solid var(--text-unselected-color);
  border-radius: 50%;
  cursor: pointer;
  width: 25px;
  height: 25px;
  outline: none;
}
</style>
