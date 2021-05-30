<template>
  <div class="cover-all-display" v-if="show">
    <div class="input-box">
      <div class="component">
        <p>
          <label for="todo_project">Project: </label>
          <select class="select-box" name="todo_project" id="todo_project" 
            v-model="todo.project">
            <option v-for="(project,index) in projects"
              :key="index" 
              :value="project">{{ todo_project_type[project] }}</option>
          </select>
        </p>
        <p>
          <label for="todo_title"><span style="margin-right: 20px">Title: </span></label>
          <input class="text-input-box" type="text" name="todo_title" id="todo_title" 
            v-model="todo.title" autocomplete="off">
        </p>
        <p>
          <label for="todo_type"><span style="margin-right: 15px">Type: </span></label>
          <select class="select-box" name="todo_type" id="todo_type" 
            v-model="todo.type">
            <option v-for="(type ,index) in types"
              :key="index" 
              :value="type">{{ todo_type[type] }}</option>
          </select>
        </p>
        <p>
          <label for="todo_exp"><span style="margin-right: 23px">Exp: </span></label>
          <input class="text-input-box" type="number" name="todo_exp" id="todo_exp" 
            v-model="todo.exp" min="1" max="5">
        </p>
        <div v-show="todo.project == 'repeat'">
        <!-- <div v-show="todo.project == false"> -->
          <p>
            <label for="todo_repeated"><span style="margin-right: 0px">Repeat: </span></label>
            <select class="select-box" name="todo_type" id="todo_type" 
              v-model="todo.repeated">
              <option v-for="day in ['week','month']"
                :key="day" 
                :value="day">{{ day }}</option>
            </select>
          </p>
          <div v-if="todo.repeated == 'week'" class="select-day">
            <div v-for="day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']" :key="day">
              <input v-model="todo.repeated_day" type="checkbox" :id="day" :value="day"><label :for="day">{{ weekday[day] }}</label>
            </div>
          </div>
          <select v-else-if="todo.repeated == 'month'" v-model="todo.repeated_date">
            <option v-for="date in monthly" :key="date" :value="date">
              {{date}}
            </option>
          </select>
          <!-- {{ todo.repeated_day }} -->
          <!-- <input type="submit" value="get Time" @click="getTodaysDate"> -->
        </div>


        <div class="buttons">
          <input type="submit" v-show="type == 'add'" value="Add Todo" @click="addData">
          <input type="submit" v-show="type == 'change'" value="Change Todo" @click="changeTodo">
          <input type="submit" v-show="type == 'change'" value="Delete" @click="deleteTodo">
          <input type="submit" value="Cancel" @click="cancel">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from '@/assets/js/Todo'
import {uuid} from 'vue-uuid';
import TimeTrigger from '@/assets/js/TimeTrigger'

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
      todo: [],
      days: [],
      date: Object,
      weekday: {'mon':'月', 'tue':'火', 'wed':'水', 'thu':'木', 'fri':'金', 'sat':'土', 'sun':'日'},
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
    getTodaysDate: function() {
      this.date = TimeTrigger;
      this.date.getToday();
    },
    addData: async function() {
      if (this.todo.exp > 5) this.todo.exp = 5;
      if (this.todo.exp <= 0) this.todo.exp = 1;
      this.todo.exp_init = this.todo.exp;
      this.todo.id = uuid.v4();
      this.$emit('add-todo', this.todo);
      this.todo = new Todo.Todo();
    },
    changeTodo: async function() {
      // console.log(this.todo.repeated_day);
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
    },
    monthly: function() {
      const a = [1, 5, 10 ,15, 20 ,25, '月末'];
      // a
      console.log(a);
      return a;
    }

  }
}
</script>

<style scoped>
.component {
  margin: 20px;
}

.buttons {
  display: flex;
  /* position: relative; */
  justify-content: space-around;
  width: 100%;
}

.cover-all-display {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(100, 100, 100, 0.8);
  z-index: 100000;
  /* vertical-align: middle; */
}

.input-box {
  position: relative;
  background: lightgoldenrodyellow;
  margin: auto;
  width: 250px;
  height: auto;
  padding: 5px;
  border-radius: 10px;
  text-align: left;
}

.select-box {
  width: 140px;
}

.text-input-box {
  width: 130px
}

.select-day {
  display: flex;
  flex-wrap: wrap;
}
</style>