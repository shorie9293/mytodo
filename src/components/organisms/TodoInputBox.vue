<template>
  <div class="cover-all-display" v-show="show">
    <div class="input-box">
      <p>
        <select class="select-box" name="todo-project" id="todo-project" 
          @change="$emit('update:todo-project', $event.target.value)">
          <option v-for="(project,index) in projects"
            :key="index" 
            :value="todo_project_type[project]">{{ todo_project_type[project] }}</option>
        </select>
      </p>
      <p>
        <label for="todo_title">Title</label>
        <input type="text" name="todo_title" id="todo_title" 
          @change="$emit('update:todo-title', $event.target.value)">
      </p>
      <p>
        <label for="todo_type">Type</label>
        <input type="text" name="todo_type" id="todo_type" 
          @change="$emit('update:todo-type', $event.target.value)">
      </p>
      <p>
        <label for="todo_exp">Exp</label>
        <input type="number" name="todo_exp" id="todo_exp" 
          @change="$emit('update:todo-exp', Number($event.target.value))">
      </p>
      <p>
        <input type="submit" value="Submit" @click="addData">
      </p>
    </div>
  </div>
</template>

<script>
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
        "null": "選択してください",
        "main": "メインクエスト",
        "sup": "サブクエスト",
        "repeat": "繰り返し"
      }
    }
  },
  methods: {
    addData: function() {
      this.$emit('add-todo');
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