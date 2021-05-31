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
      @click="showInputTodoBox"/>

  </div>
  
  <Login 
    v-show="show_login"
    :repeated_todo="repeated_todo"
    @closeLoginPanel="closeLoginPanel"
    />
  <TodoInputBox
    :show="show"
    type="add"
    @add-todo="addTodo"
    @cancel="cancel"
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
import Login from '@/components/organisms/Login'

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
    Login,
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
      show_login: false,
      repeated_todo: [],
      date: new Date(),
    }
  },
  mounted: async function() {
    const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    this.db = TodoDBAdapter;
    this.db.createDB();
    const today = `${this.date.getFullYear()}${this.date.getMonth()+1}${this.date.getDate()}`
    const login_date = JSON.parse(localStorage.getItem('login')) 
      || `${this.date.getFullYear()}${this.date.getMonth()+1}${this.date.getDate()}`

    if (today == login_date) {

      this.repeated_todo = await this.db.getProjectTodo('repeat');
      this.repeated_todo = this.repeated_todo.filter(todo => {
        if (todo.repeated_day.includes(weekday[this.date.getDay()])) {
          return true;
        }
        
        if (todo.repeated_date == this.date.getDate()) {
          return true;
        }
        
        if (todo.repeated_date == '月末') {
          const lastdate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
          if (today ==  `${lastdate.getFullYear()}${lastdate.getMonth()+1}${lastdate.getDate()}`) {
            return true;
          }
        }
      })
      this.show_login = true;
    }
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
    },
    cancel: function() {
      this.show = false;
    },
    closeLoginPanel: function() {

      // console.log(this.date.getDay(), weekday[this.date.getDay()])
      this.todo = this.repeated_todo.forEach(todo => {
          todo.project = 'now';
          this.db.addTodo(todo);
        // return todo.repeated_day.includes('wed');
      })

      // console.log(this.repeated_todo);
      this.date.setDate(this.date.getDate() + 1);
      localStorage.setItem('login', `${this.date.getFullYear()}${this.date.getMonth()+1}${this.date.getDate()}`);
      this.show_login = false;
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
