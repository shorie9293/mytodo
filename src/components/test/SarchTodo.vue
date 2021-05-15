<template>
  <div>
    <input type="text" placeholder="TEST CODE" v-model="input">
    <button @click="sarchtodo">TEST BUTTON</button>
    <div v-for="todo in sarchResult"
      :key="todo.index">
      {{ todo.value }}
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      input: '',
      todos: {
        "main": [],
        "rep": [],
        "sub": []
      },
      todo_main: [],
      todo_rep: [],
      todo_sub: [],
      sarchResult: [],
      id_number: 0
    }
  },
  mounted: function() {
  // todoリストとtodoのID、経験値UPのためにレベルデータを読み出し
    this.todos.main = JSON.parse(localStorage.getItem('todos_main')) || [];
    this.todos.rep = JSON.parse(localStorage.getItem('todos_rep')) || [];
    this.todos.sub = JSON.parse(localStorage.getItem('todos_sub')) || [];
    this.id_number = JSON.parse(localStorage.getItem('todoid')) || 0;
    // this.leveldata = JSON.parse(localStorage.getItem('leveldata')) || 0;
    // alert('hoge' + this.swiper.activeIndex)
    this.sarchResult = this.todos.main;
  },
  methods: {
    sarchtodo: function() {
      this.sarchResult = this.todos.main.filter( val => {
        return val.value.match(this.input);
      })
      Object.keys(this.todos).forEach(key => {
        console.log(this.todos[key]);
      });
    }
  }
}
</script>

<style scoped>

</style>