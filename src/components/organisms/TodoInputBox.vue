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
        <label for="todo_type">Type</label>
        <input type="text" name="todo_type" id="todo_type" 
          v-model="todo.type">
      </p>
      <p>
        <label for="todo_exp">Exp</label>
        <input type="number" name="todo_exp" id="todo_exp" 
          v-model="todo.exp">
      </p>
      <p>
        <input type="submit" value="Submit" @click="addData">
      </p>
    </div>
  </div>
</template>

<script>
import Todo from '@/assets/js/Todo'

export default {
  name: 'todo-input-box',
  props: {
    show: Boolean,
  },
  emits: [
    'add-todo',
    'update:todo-project',
    'update:todo-title',
    'update:todo-type',
    'update:todo-exp',
  ],
  data: function(){
    return {
      todo_project_type: {
        "main": "メインクエスト",
        "sub": "サブクエスト",
        "repeat": "繰り返し"
      },
      todo: new Todo.Todo(),
    }
  },
  methods: {
    addData: function() {
      this.$emit('add-todo', this.todo);
    },
  },
  computed: {
    projects: function(){
      return Object.keys(this.todo_project_type);
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