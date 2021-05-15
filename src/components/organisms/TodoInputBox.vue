<template>
  <div class="cover-all-display" v-show="show">
    <div class="input-box">
      <p>
        <select class="select-box" name="todo-project" id="todo-project" 
          v-model="todo.project">
          <option v-for="(project,index) in projects"
            :key="index" 
            :value="project">{{ todo_project_type[project] }}</option>
        </select>
      </p>
      <p>
        <label for="todo_title">Title</label>
        <input type="text" name="todo_title" id="todo_title" 
          v-model="todo.title">
      </p>
      <p>
        <select class="select-box" name="todo_type" id="todo_type" 
          v-model="todo.type">
          <option v-for="(type ,index) in types"
            :key="index" 
            :value="type">{{ todo_type[type] }}</option>
        </select>
      </p>
      <p>
        <label for="todo_exp">Exp</label>
        <input type="number" name="todo_exp" id="todo_exp" 
          v-model="todo.exp" min="0" max="5">
      </p>
      <p>
        <input type="submit" value="Submit" @click="addData">
      </p>
    </div>
  </div>
</template>

<script>
import Todo from '@/assets/js/Todo'
import {uuid} from 'vue-uuid';

export default {
  name: 'todo-input-box',
  props: {
    show: Boolean,
    getTodo: Todo.Todo,
  },
  emits: [
    'add-todo',
  ],
  data: function(){
    return {
      todo_project_type: {
        "main": "メインクエスト",
        "sub": "サブクエスト",
        "repeat": "繰り返し"
      },
      // TodoPanelと重複あり
      todo_type: {
        "nexttask" : "次の行動",
        "otherperson" : "連絡待ち",
        "wait" : "待機",
      },
      todo: new Todo.Todo(),
    }
  },
  methods: {
    addData: async function() {
      if (this.todo.exp > 5) this.todo.exp = 5;
      this.todo.id = uuid.v4();
      this.$emit('add-todo', this.todo);
      this.todo = new Todo.Todo();
    },
  },
  computed: {
    projects: function(){
      return Object.keys(this.todo_project_type);
    },
    types: function(){
      return Object.keys(this.todo_type);
    }

  }
}
</script>

<style scoped>
.cover-all-display {
  position: absolute;
  display: table-cell;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(100, 100, 100, 0.8);
  z-index: 100000;
  vertical-align: middle;
}

.input-box {
  position:relative;
  margin: auto;
  margin-top: 40%;
  background: lightgoldenrodyellow;
  width: 250px;
  padding: 5px;
}
</style>