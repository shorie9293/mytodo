<template>
  <div v-for="(todo, index) in todos" :key="todo.id">
    <input :id="todo.id" type="checkbox" v-model="todo.checked">
    <label :for="todo.id">{{ todo.value }}: {{ todo.exp }}</label><span @click="deleteItem(index)"> [x]</span>
  </div>
  <dl>
  <dt>タイトル</dt>
  <dd><input type="text" v-model="todo_title"/></dd>
  <dt>けいけんち</dt>
  <dd><input type="Number" v-model="todo_exp"/></dd>
  </dl>
  <Button @click="addTodo" title="くわえる"/>
  <Button @click="enhanceExp" title="けいけんちアップ"/>
  <Button @click="deleteCheckedItem" title="かんりょうずみをけす"/>
</template>

<script>
import Button from '../atoms/Button';
export default {
  name: "todo-panel",
  components: {
    Button
  },
  props: {
    class: String
  },
  data() {
    return {
      leveldata: [],
      todos: [],
      todo_title: '',
      todo_exp: '',
      id_number: 0,
    }
  },
  mounted: function() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.id_number = JSON.parse(localStorage.getItem('todoid')) || 0;
    this.leveldata = JSON.parse(localStorage.getItem('leveldata')) || 0;
  },
  watch: {
    todos: {
      handler: function() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        localStorage.setItem('todoid', JSON.stringify(this.id_number));
      },
      deep: true
    }
  },
  methods: {
    addTodo: function() {
      this.todos.push({id: this.id_number, value: this.todo_title, exp: this.todo_exp, checked: false});
      this.id_number++;
      this.todo_title = '';
      this.todo_exp = '';
    },
    deleteItem: function(index) {
      if (!confirm('けしますか？')) {
        return;
      }
      this.todos.splice(index, 1);
      this.todo_title = '';
    },
    deleteCheckedItem: function() {
      this.todos = this.remaining;
    },
    enhanceExp: function() {
      if (!confirm('けいけんちをアップしますか？')) {
        return;
      }
      this.leveldata.exp += this.calExp
      new Audio(require("/public/media/powerup10.mp3")).play();

      localStorage.setItem('leveldata', JSON.stringify(this.leveldata))
    }
  },
  computed: {
    remaining: function() {
      if (!confirm('完了タスクをけしますか？')) {
        return;
      }
      return this.todos.filter(function(todo){
        return !todo.checked;
      })
    },
    calExp: function() {
      var totalExp = 0
      this.todos.forEach(function(todo){
        if (todo.checked) {
          totalExp += Number(todo.exp);
        }
      })
      return totalExp;
    }
    
  },
}
</script>

<style scoped>

</style>