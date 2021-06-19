<!-- TODOを表示するパネル
TODOの機能はこのコンポーネントで完結できるようにする。 -->
<template>
  <h3>
    {{ project_name[realIndex] }}クエスト
  </h3>
  <div class="searchbox">
    <input type="text" placeholder="SEARCH TODO" v-model="searchtext">
    <Button @click="searchtodo" title="SEARCH" />
  </div>
  <Flash :show="show"/>
  
  <swiper ref="mainSwiper"
    :padding="10"
    :slides-per-view="1" 
    :space-between="10"
    :controller="{ control: controlledSwiper }"
    @swiper="setControlledSwiper"
    @slideChange="getRealIndex"
    class="swiper">

    <swiper-slide v-for="todos in slide_todos"
      :key="todos.index" class="slider">
      <div v-for="todo in todos" :key="todo.id">
          <TodoPanel :forid="todo.index"
            :todo="todo"
            :classofvalue="{'finished' : todo.checked}"
            :classType="todo.type"
            v-model:checked="todo.checked"
            @edit-task="editTask(todo.index)"
            @sent-task="sentTaskToNow(todo.index)" />
      </div>
    </swiper-slide>

  </swiper>

  <Button @click="finishTask" title="FINISH!!"/>

  <TodoInputBox
    :getTodo="todo_changed"
    :show="show_TodoInputBox"
    type="change"
    @change-todo="changeTodo"
    @cancel="cancel"
    @delete-todo="deleteTodo"
    />

</template>
<script>
import Button from '@/components/atoms/Button';
import TodoPanel from '@/components/molecules/TodoPanel.vue';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Controller } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import Flash from '@/components/molecules/Flash'
SwiperCore.use([Navigation, Controller]);
import TodoDBAdapter from '@/assets/js/TodoDBAdapter'
import TodoInputBox from '@/components/organisms/TodoInputBox'

export default {
  name: "todo-panel",
  components: {
    Button,
    TodoPanel,
    Swiper,
    SwiperSlide,
    Flash,
    TodoInputBox
  },
  props: {
    todo_added: Object,
  },
  data() {
    return {
      leveldata: [],
      todos: [],
      project_name: [
        "メイン", "サブ", "繰り返し", "アーカイブ"
      ],
      realIndex: 0,
      controlledSwiper: null,
      complete: '達成せよ',
      searchtext: '',
      show: false,
      show_TodoInputBox: false,
      edit_index: Number,
      db: Object,
      date: Date,
    }
  },
  mounted: async function() {
    // todoリストとtodoのID、経験値UPのためにレベルデータを読み出し
    this.leveldata = JSON.parse(localStorage.getItem('leveldata')) || 0;

    this.db = TodoDBAdapter;
    this.db.createDB();
    this.todos = await this.db.getQuery();
    // console.log(this.todos);
  },
  watch: {
    // todoリストが変更されたらlocalStorageを変更する
    // handlerとdeepオプションをつけることで、todoオブジェクトの中身も管理する
    'todos': {
      handler: async function() {
        if (!Object.keys(this.todos).length) {
          return;
        }
        
        await this.db.changeChecked(this.todos);
      },
      deep: true
    },
    'todo_added': async function() {
      
      // この書き方だとうまく行かない。おそらくpropで渡したやつを再レンダリングしようとして失敗してる。
      // ライフサイクル的なところ？
      // this.todos.push(
      //   this.todo_added,
      // );

      this.todos = await this.db.getQuery();
    },
  },
  methods: {
    finishTask: async function() {
      if (!this.calExp) {
        return;
      }

      this.leveldata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();

      this.todos = await this.db.finishTask();

      this.show=true;

      let v = this;
      setTimeout(function(){
        v.show=false;
        },600);

      localStorage.setItem('leveldata', JSON.stringify(this.leveldata))
    },
    editTask: async function(index) {
      this.edit_index = index;
      this.show_TodoInputBox = true;
    },
    changeTodo: async function(todo) {
      // console.log(todo.repeated_day);
      // await this.db.changeTodo(todo, this.edit_index);
      await this.db.changeTodo(todo);
      this.todos = await this.db.getQuery();
      this.show_TodoInputBox = false;
    },
    cancel: async function() {
      this.todos = await this.db.getQuery();
      this.show_TodoInputBox = false;
    },
    deleteTodo: async function() {
      // console.log('put delete button')
      if (!confirm('タスクを削除しますか？')) {
        return;
      }
      
      this.todos = await this.db.deleteTodo(this.edit_index);
      this.show_TodoInputBox = false;
    },
    sentTaskToNow: async function(index) {
      // console.log(`sentTaskToNow: click item index is ${index}`)

      if (!confirm('今やるタスクにうつしますか？')) {
        return;
      }

      this.todos = await this.db.changeTaskProject(index, 'now');
      // this.todos = await this.db.getQuery();

    },
    // かんりょうずみタスクの経験値を反映。
    // computedのcalExpを使っている。
    enhanceExp: function() {
      
      if (!this.calExp) {
        return;
      }

      this.leveldata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();

      this.todos.forEach( todo => {
          if (todo.checked) {
            todo.checked = false;
          }
        }
      )

      this.show=true;

      let v = this;
      setTimeout(function(){
        v.show=false;
        },600);

      localStorage.setItem('leveldata', JSON.stringify(this.leveldata))
    },
    // swiperのインスタンスを登録
    setControlledSwiper(swiper) {
      this.controlledSwiper = swiper;
    },
    // 現在のスライダーを取得
    getRealIndex: function() {
      this.realIndex = this.controlledSwiper.realIndex
    },
    searchtodo: async function() {

      if (this.searchtext == '') {
        this.todos = await this.db.getQuery();
        return;
      }

      this.todos = await this.db.searchTitle(this.searchtext);

    },
  },
  computed: {
    todo_changed: function() {
      return this.todos.filter(todo => {return todo.index == this.edit_index})[0];
    },
    // 完了済みタスクの経験値を合計して返す。
    calExp: function() {
      var totalExp = 0
      
      this.todos.forEach(function(todo){
          if (todo.checked) {
            totalExp += Number(todo.exp);
            // console.log(todo.title, todo.exp);
          }
        })
      return totalExp;
    },
    slide_todos: function() {
      const show_archive = Boolean(JSON.parse(localStorage.getItem('show_archive')));

      if (show_archive) {
        return [this.todos_main, this.todos_sub, this.todos_repeat, this.todos_archive];
      } else {
        return [this.todos_main, this.todos_sub, this.todos_repeat];
      }
    },
    todos_main: function() {
      return this.todos.filter((value) =>{
        return value.project == 'main'
      })
    },
    todos_sub: function() {
      return this.todos.filter((value) =>{
        return value.project == 'sub'
      })
    },
    todos_repeat: function() {
      return this.todos.filter((value) =>{
        return value.project == 'repeat'
      })
    },
    todos_archive: function() {
      return this.todos.filter((value) =>{
        return value.project == 'archive'
      })
    },
  },
}
</script>

<style scoped>
.searchbox {
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
}

h3 {
  margin-top: 0px;
  margin-bottom: 5px;
}

.swiper {
  align-content: center;
  padding-bottom: 10px;
  margin-bottom: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgba(201, 231, 231, 0.6);
  /* overflow: scroll; */
  height: 76%;
  border-radius: 5px;
  box-shadow: 2px 2px rgba(0,0,0,0.1);
}

</style>
