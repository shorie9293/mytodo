<template>
  <div class="cover-all-display" v-if="show">
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
          v-model="todo.title" autocomplete="off">
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
          v-model="todo.exp" min="1" max="5">
      </p>
      <div class="bottuns">
        <input type="submit" v-show="type == 'add'" value="Add Todo" @click="addData">
        <input type="submit" v-show="type == 'change'" value="Change Todo" @click="changeTodo">
        <input type="submit" v-show="type == 'change'" value="Delete" @click="deleteTodo">
        <input type="submit" value="Cancel" @click="cancel">
      </div>
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
    getTodo: Object,
    type: String,
  },
  emits: [
    'add-todo',
    'change-todo',
    'cancel',
    'delete-todo'
  ],
  data: function(){
    return {
      todo_project_type: {
        "main": "メインクエスト",
        "sub": "サブクエスト",
        "repeat": "繰り返し",
        "now": "今すぐやる",
      },
      // TodoPanelと重複あり
      todo_type: {
        "nexttask" : "次の行動",
        "otherperson" : "連絡待ち",
        "wait" : "待機",
      },
      todo: Object,
    }
  },
  mounted: function(){
    // console.log(`Get todo ${this.getTodo}`)
    if (!this.getTodo) {
      this.todo = new Todo.Todo();
      return;
    }
    this.todo = this.getTodo;

  },
  watch: {
    'getTodo': function() {
      this.todo = this.getTodo;
    }
  },
  methods: {
    addData: async function() {
      if (this.todo.exp > 5) this.todo.exp = 5;
      if (this.todo.exp <= 0) this.todo.exp = 1;
      this.todo.exp_init = this.todo.exp;
      this.todo.id = uuid.v4();
      this.$emit('add-todo', this.todo);
      this.todo = new Todo.Todo();
    },
    changeTodo: async function() {
      if (this.todo.exp > 5) this.todo.exp = 5;
      if (this.todo.exp <= 0) this.todo.exp = 1;
      this.todo.exp_init = this.todo.exp;
      this.$emit('change-todo', this.todo);
      // this.todo = new Todo.Todo();
    },
    cancel: function() {
      this.$emit('cancel');
    },
    deleteTodo: function() {
      this.$emit('delete-todo');
    }
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
.buttons {
  display: flex;
}

.cover-all-display {
  position: fixed;
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
  border-radius: 10px;
}
</style>