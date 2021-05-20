<!-- 各コンポーネント表示用 -->
<template>
  <div class="display-panel">
    <template v-if="display==0">
      <StatusComponent
        :todo_added="todo"/>
    </template>
    <template v-else-if="display==1">
      <TodoComponent 
        :todo_added="todo"/>
    </template>
    <template v-else-if="display==2">
      <battle-component />
    </template>
    <template v-else>
      <Option />
    </template>
    <FloatingButton
    @click="showInputTodoBox"
     />
  </div>

  <TodoInputBox
    :show="show"
    type="add"
    @add-todo="addTodo"
    />
  <Footer :displayMenus="displayMenus" @setDisplay="setDisplay"/>
</template>

<script>
import TodoComponent from '@/components/organisms/TodoComponent.vue'
import StatusComponent from '@/components/organisms/StatusComponent.vue'
import BattleComponent from '@/components/organisms/BattleComponent.vue'
import Option from '@/components/pages/Option'
import Footer from '@/components/organisms/Footer.vue'
import FloatingButton from '@/components/atoms/FlortingButton'
import TodoInputBox from '@/components/organisms/TodoInputBox'
import TodoDBAdapter from '@/assets/js/TodoDBAdapter'

export default {
  name: 'QuestTemplate',
  components: {
    StatusComponent,
    BattleComponent,
    TodoComponent,
    Option,
    Footer,
    FloatingButton,
    TodoInputBox,
  },
  data: function() {
    return{
      display: 0,
      displayMenus: [
        {"title":"HOME", "display": true, "img": "todo.png"},
        {"title":"TODO", "display": false, "img": "todo.png"},
        {"title":"BTL", "display": false, "img": "todo.png"},
        {"title":"OPT", "display": false, "img": "todo.png"}
      ],
      show: false,
      db: Object,
      todo: {},

    }
  },
  mounted: function() {
    this.db = TodoDBAdapter;
    this.db.createDB();
  },
  methods: {
    setDisplay: function(index) {
      this.displayMenus[this.display].display = false;
      this.displayMenus[index].display = true;
      this.display = index;
    },
    addTodo: function(todo) {
      // console.log(todo);
      this.db.addTodo(todo);
      this.todo = todo;
      this.show = false;
    },
    showInputTodoBox: function() {
      this.show = true;
    }
  }
}
</script>

<style scoped>

  .display-panel {
    position: relative;
    border-radius: 10px;
    box-shadow: 1px 2px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-right: auto;
    margin-left: auto;
    width: 95%;
    height: 78vh;
    background-color: rgb(196, 227, 255);
    background-image: url(./../../assets/imgs/06.jpg);
    background-repeat: repeat;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }
  .display-panel::-webkit-scrollbar {
    display: none;
  }

</style>
