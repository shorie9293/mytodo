<template>
  <div class="component">
    過去データ読み込み
    <input type="submit" value="START" @click="startReading">
  </div>
</template>

<script>
import TodoDBAdapter from '@/assets/js/TodoDBAdapter'
import Todo from '@/assets/js/Todo'
import {uuid} from 'vue-uuid';

export default {
  data: function() {
    return {
      db: Object,
      todoJmain: [],
      todoJsub: [],
      todoJrepeat: [],
      todoJnow: [],
    }
  },
  methods: {
    startReading: function() {
      this.getJson();
      this.setDB();
    },
    getJson: function() {
      this.todoJmain = JSON.parse(localStorage.getItem('todos_main')) || [];
      this.todoJsub = JSON.parse(localStorage.getItem('todos_sub')) || [];
      this.todoJrepeat = JSON.parse(localStorage.getItem('todos_rep')) || [];
      this.todoJnow = JSON.parse(localStorage.getItem('doit_now')) || [];
    },
    setDB: function() {
      this.db = TodoDBAdapter;
      let todo = new Todo.Todo;
      for (const todo0 of this.todoJmain) {
        todo.id = uuid.v4();
        todo.project = 'main';
        // todo.title = todo0.title;
        todo.title = todo0.value;
        if (todo0.exp <= 0) todo0.exp = 1;
        todo.exp = todo0.exp;
        todo.type = 'nexttask'
        todo.checked = false;
        this.db.addTodo(todo);
      }

      for (const todo0 of this.todoJsub) {
        todo.id = uuid.v4();
        todo.project = 'sub';
        // todo.title = todo0.title;
        todo.title = todo0.value;
        if (todo0.exp <= 0) todo0.exp = 1;
        todo.exp = todo0.exp;
        todo.type = 'nexttask'
        todo.checked = false;
        this.db.addTodo(todo);
      }

      for (const todo0 of this.todoJrepeat) {
        todo.id = uuid.v4();
        todo.project = 'repeat';
        // todo.title = todo0.title;
        todo.title = todo0.value;
        if (todo0.exp <= 0) todo0.exp = 1;
        todo.exp = todo0.exp;
        todo.type = 'nexttask'
        todo.checked = false;
        this.db.addTodo(todo);
      }

      for (const todo0 of this.todoJnow) {
        todo.id = uuid.v4();
        todo.project = 'now';
        // todo.title = todo0.title;
        todo.title = todo0.value;
        if (todo0.exp <= 0) todo0.exp = 1;
        todo.exp = todo0.exp;
        todo.type = 'nexttask'
        todo.checked = false;
        this.db.addTodo(todo);
      }

    }
  }

}
</script>

<style>
.component {
  display: flex;
  background: lightgreen;
  height: 50px;
  widows: 100%;
  padding: auto;
  vertical-align: middle;
}

</style>