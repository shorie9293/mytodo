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
// import Todo from '@/assets/js/Todo'

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
      todo: [],
      show_login: false,
      repeated_todo: [],
      date: new Date(),
    }
  },
  mounted: async function() {
    this.db = TodoDBAdapter;
    this.db.createDB();
    // this.db.resetRepeatFlag('week');
    this.repeated_todo = await this.db.getProjectTodo('repeat');
    await this.startLogin();
  },
  methods: {
    startLogin: async function() {
      let month = `${this.date.getMonth()+1}`
      month = this.date.getMonth() + 1 < 10 ? '0' + month : month;
      let date = `${this.date.getDate()}`
      date = this.date.getDate() < 10 ? '0' + date : date;
      const week = {'mon':1, 'tue':2, 'wed':3, 'thu':4, 'fri':5, 'sat':6, 'sun':0}
      const today = `${this.date.getFullYear()}${month}${date}`
      const login_date = JSON.parse(localStorage.getItem('login')) 
        || today

      if (today >= login_date) {
        this.repeated_todo = this.repeated_todo.filter(todo => {
          let todo_week_day = todo.repeated_day.map(val => {
            return week[val]
          });
          console.log(Math.max(...todo_week_day))
          if (this.date.getDay() >= Math.max(...todo_week_day) && todo.repeated_flag == false) {
            console.log(todo_week_day, this.date.getDay());
            todo.repeated_flag = true;
            return true;
          }
          
          if (todo.repeated_date <= this.date.getDate() && todo.repeated_flag == false) {
            todo.repeated_flag = true;
            return true;
          }
          
          if (todo.repeated_date == '月末') {
            const lastdate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
            if (today ==  `${lastdate.getFullYear()}${month}${lastdate.getDate()}`) {
              todo.repeated_flag = true;
              return true;
            }
          }
        })
        this.show_login = true;
      }
    },
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
    closeLoginPanel: async function() {

      // console.log(this.date.getDay(), weekday[this.date.getDay()])
  
      this.todo = await this.repeated_todo.forEach(todo => {
          this.db.changeTodo(todo);
          console.log(todo.index, todo.repeated_flag);
          todo.project = 'now';
          this.db.addTodo(todo);
      })

      // console.log(this.repeated_todo);
      this.date.setDate(this.date.getDate() + 1);
      let month = `${this.date.getMonth()+1}`
      month = this.date.getMonth() + 1 < 10 ? '0' + month : month;
      let date = `${this.date.getDate()}`
      date = this.date.getDate() < 10 ? '0' + date : date;
      localStorage.setItem('login', `${this.date.getFullYear()}${month}${date}`);
      this.show_login = false;
    },

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
