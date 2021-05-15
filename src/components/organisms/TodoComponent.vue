<!-- TODOを表示するパネル
TODOの機能はこのコンポーネントで完結できるようにする。 -->
<template>
  <h3>
    {{ project_name[Object.keys(project_name)[realIndex]] }}クエスト
  </h3>
  <Flash :show="show"/>

  <swiper ref="mainSwiper"
    :padding="10"
    :slides-per-view="1" 
    :space-between="10"
    :controller="{ control: controlledSwiper }"
    @swiper="setControlledSwiper"
    @slideChange="getRealIndex"
    class="swiper">
    <swiper-slide v-for="(todo,index) in [todos_main, todos_repeat, todos_sub]"
      :key="index" class="slider">
      <div v-for="(t, index) in todo" :key="t.id">
          <!-- <input class="checkbox" :id="t.id" type="checkbox" v-model="t.checked"> -->
          <TodoPanel :forid="t.index"
            :value="t.title"
            :exp="Number(t.exp)"
            :initialExp="Number(t.exp)"
            :taskType="t.type"
            :classofvalue="{'finished' : t.checked}"
            :index="index"
            :classType="t.type"
            v-model:checked="t.checked"
            v-model:select="pick"
            @delete-item="deleteItem" />
      </div>
    </swiper-slide>
  </swiper>

  <div>
    <TodoInputPanel 
      @add-todo="addTodo" 
      @change-todo="changeTodo"
      @clear-input="clearInput"
      @add-today="addToday"
      v-model:todotitle="ptitle"
      v-model:todoexp="pexp"
      v-model:todotype="ptype"
      />
    <div class="searchbox">
      <input type="text" placeholder="SEARCH TODO" v-model="searchtext">
      <Button @click="searchtodo" title="SEARCH" />
    </div>
    <Button @click="enhanceExp" title="けいけんちアップ"/>
    <Button @click="deleteCheckedItem" title="かんりょうずみをけす"/>
    <Button @click="hoimi" title="けいけんちかいふく"/>
  </div>
  <Button @click="addTodoList" title="TEST"/>
</template>
<script>
import Button from '@/components/atoms/Button';
import TodoPanel from '@/components/molecules/TodoPanel.vue';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Controller } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import TodoInputPanel from './TodoInputPanel.vue';
import Flash from '../molecules/Flash'
SwiperCore.use([Navigation, Controller]);
import TodoDBAdapter from '@/assets/js/TodoDBAdapter'

export default {
  name: "todo-panel",
  components: {
    Button,
    TodoPanel,
    Swiper,
    SwiperSlide,
    TodoInputPanel,
    Flash
  },
  props: {
    class: String,
    todo_added: Object,
  },
  data() {
    return {
      leveldata: [],
      todos: [],
      doitnow: [],
      id_number: 0,
      pick: 0,
      project_name: {
        "main" : "メイン",
        "repeat" : "繰り返し",
        "sub" : "サブ"
      },
      realIndex: 0,
      controlledSwiper: null,
      ptitle: '',
      pexp: 0,
      ptype: 'nexttask',
      complete: '達成せよ',
      searchtext: '',
      searchResult: [],
      show: false,
      db: Object,
    }
  },
  mounted: async function() {
    // todoリストとtodoのID、経験値UPのためにレベルデータを読み出し
    this.leveldata = JSON.parse(localStorage.getItem('leveldata')) || 0;
    this.searchResult = this.todos
    this.doitnow = JSON.parse(localStorage.getItem('doit_now')) || [];

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
    'doitnow': {
      handler: function() {
        localStorage.setItem('doit_now', JSON.stringify(this.doitnow));
      },
      deep: true
    },
    'pick': function() {
      this.ptitle = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick].value;
      this.pexp = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick].exp;
      this.ptype = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick].type;
    },
  },
  methods: {
    addTodoList: function() {
      this.db.addTodo({
        project: 'project',
        title: 'title',
        type: 'type', 
        exp: 0});
      this.todos[this.todo.project].push(
        this.todo,
      );

    },
    // todoを加える。
    addTodo: function() {
      if (this.pexp > 5) this.pexp = 5
      this.todos[Object.keys(this.project_name)[this.realIndex]].push({id: this.id_number,
        value: this.ptitle,
        exp: this.pexp,
        initialExp: this.pexp,
        type: this.ptype,
        checked: false});
        this.id_number++;
        this.ptitle = '';
        this.pexp = 0;
    },
    // todoを変更する。
    changeTodo: function() {
      if (this.pexp > 5) this.pexp = 5
      let proj = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick];
      this.ptitle != '' ? proj.value = this.ptitle : '';
      this.pexp != '' ? proj.exp = this.pexp : '';
      this.pexp != '' ? proj.initialExp = this.pexp : '';
      this.ptype != '' ? proj.type = this.ptype : '';
      this.ptitle = '';
      this.pexp = 0;
    },
    clearInput: function() {
      this.ptitle = '';
      this.pexp = 0;
    },
    // [x]ボタンを押すとtodoを消す
    // deleteItem: function(index, key) {
    //   if (!confirm('けしますか？')) {
    //     return;
    //   }
    //   this.todos[key].splice(index, 1);
    // },
    deleteItem: function(e) {
      if (!confirm('けしますか？')) {
        return;
      }
      this.todos[Object.keys(this.project_name)[this.realIndex]].splice(e, 1);
    },
    // checkされたアイテムを消す。
    // computedに定義されたremainingをtodoに代入している。
    deleteCheckedItem: function() {
      if (!confirm('完了タスクをけしますか？')) {
        return;
      }

      this.todos[Object.keys(this.project_name)[this.realIndex]] = this.remaining;
    },
    // かんりょうずみタスクの経験値を反映。
    // computedのcalExpを使っている。
    enhanceExp: function() {
      
      if (!this.calExp) {
        return;
      }

      this.leveldata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();

      this.todos.rep.forEach( todo => {
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
    // 経験値の回復。将来的には時間トリガーみたいな感じにしたい。
    hoimi: function() {
      if (!confirm('くりかえしタスクのけいけんちをかいふくしますか？')) {
        return;
      }

      this.todos.rep.forEach(todo=>{
        todo.exp = todo.initialExp
        todo.checked = false
      })
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
      // console.log(this.searchtext);
      // console.log(await this.db.searchTitle(this.searchtext));

      this.todos = await this.db.searchTitle(this.searchtext);

      // this.searchResult = [];
      // Object.keys(this.todos).forEach(key => {
      //   let v =  this.todos[key].filter( v => {
      //     return v.value.match(this.searchtext);
      //   });
      //   this.searchResult.push(v);
      // })
      // this.searchtext = '';
    },
    addToday: function() {
      if (!this.pick) {
        // console.log("not selected todo");
        return;
      }

      let proj = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick];
      this.doitnow.push(proj);
      this.todos[Object.keys(this.project_name)[this.realIndex]].splice(this.pick, 1);
      this.clearInput();
    }

  },
  computed: {
    // 完了していないタスクのみを抽出した配列を返す
    remaining: function() {

      return this.todos[Object.keys(this.project_name)[this.realIndex]].filter((todo) => {
        return !todo.checked;
      })
    },
    // 完了済みタスクの経験値を合計して返す。
    calExp: function() {
      var totalExp = 0
      let v = this.todos
      Object.keys(this.project_name).forEach(function(p){
        v[p].forEach(function(todo){
          if (todo.checked) {
            totalExp += Number(todo.exp);
            todo.exp = 0;
          }
        })
      })
      return totalExp;
    },
    todos_main: function() {
      return this.todos.filter((value) =>{
        return value.project == 'main'
      })
    },
    todos_repeat: function() {
      return this.todos.filter((value) =>{
        return value.project == 'repeat'
      })
    },
    todos_sub: function() {
      return this.todos.filter((value) =>{
        return value.project == 'sub'
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
  height: 300px;
  border-radius: 5px;
  box-shadow: 2px 2px rgba(0,0,0,0.1);
}

</style>
