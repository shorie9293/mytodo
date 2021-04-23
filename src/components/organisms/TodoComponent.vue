<!-- TODOを表示するパネル
TODOの機能はこのコンポーネントで完結できるようにする。 -->
<template>
  <h3>
    {{ project_name[Object.keys(project_name)[realIndex]] }}クエスト
  </h3>
  <div class="searchbox">
    <input type="text" placeholder="SEARCH TODO" v-model="searchtext">
    <Button @click="searchtodo" title="SEARCH" />
  </div>
  <swiper ref="mainSwiper"
    :slides-per-view="1" 
    :space-between="10"
    :controller="{ control: controlledSwiper }"
    @swiper="setControlledSwiper"
    @slideChange="getRealIndex"
    class="swiper"
    >
    <swiper-slide v-for="(todo, key) in searchResult" :key="key" class="slider">
      <div v-for="(t, index) in todo" :key="key + t.id">
          <!-- <input class="checkbox" :id="t.id" type="checkbox" v-model="t.checked"> -->
          <TodoPanel :forid="t.id"
          :value="t.value"
          :exp="Number(t.exp)"
          :initialExp="Number(t.initialExp)"
          :taskType="t.type"
          :classofvalue="{'finished' : t.checked}"
          :keyValue="key.toString()"
          :index="index"
          :classType="t.type"
          v-model:checked="t.checked"
          v-model:select="pick"
          @delete-item="deleteItem"
          />
      </div>
    </swiper-slide>
  </swiper>

  <div>
    <TodoInputPanel 
      @add-todo="addTodo" 
      @change-todo="changeTodo"
      @clear-input="clearInput"
      v-model:todotitle="ptitle"
      v-model:todoexp="pexp"
      v-model:todotype="ptype" />
    <Button @click="enhanceExp" title="けいけんちアップ"/>
    <Button @click="deleteCheckedItem" title="かんりょうずみをけす"/>
    <Button @click="hoimi" title="けいけんちかいふく"/>
  </div>

</template>

<script>
import Button from '../atoms/Button';
import TodoPanel from '../molecules/TodoPanel.vue';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Controller } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import TodoInputPanel from './TodoInputPanel.vue';
SwiperCore.use([Navigation, Controller]);

export default {
  name: "todo-panel",
  components: {
    Button,
    TodoPanel,
    Swiper,
    SwiperSlide,
    TodoInputPanel,
  },
  props: {
    class: String,
  },
  data() {
    return {
      leveldata: [],
      todos: {
        "main": [],
        "rep": [],
        "sub": []
      },
      id_number: 0,
      pick: 1,
      project_name: {
        "main" : "メイン",
        "rep" : "繰り返し",
        "sub" : "サブ"
      },
      realIndex: 0,
      controlledSwiper: null,
      ptitle: '',
      pexp: 0,
      ptype: 'nexttask',
      complete: '達成せよ',
      searchtext: '',
      searchResult: []
    }
  },
  mounted: function() {
    // todoリストとtodoのID、経験値UPのためにレベルデータを読み出し
    this.todos.main = JSON.parse(localStorage.getItem('todos_main')) || [];
    this.todos.rep = JSON.parse(localStorage.getItem('todos_rep')) || [];
    this.todos.sub = JSON.parse(localStorage.getItem('todos_sub')) || [];
    this.id_number = JSON.parse(localStorage.getItem('todoid')) || 0;
    this.leveldata = JSON.parse(localStorage.getItem('leveldata')) || 0;
    this.searchResult = this.todos
    // alert('hoge' + this.swiper.activeIndex)
  },
  watch: {
    // todoリストが変更されたらlocalStorageを変更する
    // handlerとdeepオプションをつけることで、todoオブジェクトの中身も管理する
    todos: {
      handler: function() {
        localStorage.setItem('todos_main', JSON.stringify(this.todos.main));
        localStorage.setItem('todos_sub', JSON.stringify(this.todos.sub));
        localStorage.setItem('todos_rep', JSON.stringify(this.todos.rep));
        localStorage.setItem('todoid', JSON.stringify(this.id_number));
      },
      deep: true
    },
    pick: function() {
      this.ptitle = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick].value;
      this.pexp = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick].exp;
      this.ptype = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick].type;
    },
  },
  methods: {
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
      let proj = this.todos[Object.keys(this.project_name)[this.realIndex]][this.pick]
      this.value != '' ? proj.value = this.ptitle : ''
      this.exp != '' ? proj.exp = this.pexp : ''
      this.exp != '' ? proj.initialExp = this.pexp : ''
      this.type != '' ? proj.type = this.ptype : ''
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
      console.log(e);
      if (!confirm('けしますか？')) {
        return;
      }
      this.todos[e.key].splice(e.index, 1);
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
      this.leveldata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();

      this.todos.rep.forEach( todo => {
          if (todo.checked) {
            todo.checked = false;
          }
        }
      )

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
    searchtodo: function() {

      if (this.searchtext == '') {
        this.searchResult = this.todos
        return;
      }

      this.searchResult = [];
      Object.keys(this.todos).forEach(key => {
        let v =  this.todos[key].filter( v => {
          return v.value.match(this.searchtext);
        });
        this.searchResult.push(v);
      })
      this.searchtext = '';
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
  padding-left: auto;
  padding-right: auto;
  padding-bottom: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* overflow: scroll; */
  height: 300px;
}

</style>
