<!-- TODOを表示するパネル
TODOの機能はこのコンポーネントで完結できるようにする。 -->
<template>
  
  <swiper ref="mainSwiper"
    :slides-per-view="1" 
    :space-between="10"
    :controller="{ control: controlledSwiper }"
    :short-swipes="false"
    @swiper="setControlledSwiper"
    @slideChange="getRealIndex"
    class="swiper"
    >
      <swiper-slide v-for="(todo, key) in todos" :key="key" class="slider">
        <h3>{{ project_name[key] }}</h3>
        <div v-for="(t, index) in todo" :key="t.id">
          <div :class="['container', t.type]">
            <input class="checkbox" :id="t.id" type="checkbox" v-model="t.checked">
            <TodoPanel :forid="t.id"
            :value="t.value"
            :exp="Number(t.exp)"
            :initialExp="Number(t.initialExp)"
            :taskType="tasktype[t.type]"
            :classofvalue="{'finished' : t.checked}"
            />
            <div class="todo-btn">
              <div @click="deleteItem(index, key)" class="peke"> [x]</div>
              <!-- ラジオボタンで選択。'pick'にindexを格納している。 -->
              <input :id="t.id"  type="radio" name="todoitems" v-model="pick" :value="index">
            </div>
          </div>

        </div>
      </swiper-slide>

  </swiper>

  <div>
    <TodoInputPanel 
      @add-todo="addTodo" 
      @change-todo="changeTodo"
      @clear-input="clearInput"
      v-model:msg="pmsg"
      v-model:todotitle="ptitle"
      v-model:todoexp="pexp"
      v-model:todotype="ptype" />
    <StandardButton @click="enhanceExp" title="けいけんちアップ"/>
    <StandardButton @click="deleteCheckedItem" title="かんりょうずみをけす"/>
    <StandardButton @click="hoimi" title="けいけんちかいふく"/>
  </div>

</template>

<script>
import StandardButton from '../atoms/Button';
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
    StandardButton,
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
      pick: 'none',
      project_name: {
        "main" : "メイン",
        "rep" : "繰り返し",
        "sub" : "サブ"
      },
      project_no: [
        "main",
        "rep",
        "sub"
      ],
      tasktype: {
        "nexttask" : "次の行動",
        "otherperson" : "連絡待ち",
        "wait" : "待機",
      },
      realIndex: 0,
      controlledSwiper: null,
      pmsg: '',
      ptitle: '',
      pexp: 0,
      ptype: 'nexttask'
    }
  },
  mounted: function() {
    // todoリストとtodoのID、経験値UPのためにレベルデータを読み出し
    this.todos.main = JSON.parse(localStorage.getItem('todos_main')) || [];
    this.todos.rep = JSON.parse(localStorage.getItem('todos_rep')) || [];
    this.todos.sub = JSON.parse(localStorage.getItem('todos_sub')) || [];
    this.id_number = JSON.parse(localStorage.getItem('todoid')) || 0;
    this.leveldata = JSON.parse(localStorage.getItem('leveldata')) || 0;
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
      this.ptitle = this.todos[this.project_no[this.realIndex]][this.pick].value;
      this.pexp = this.todos[this.project_no[this.realIndex]][this.pick].exp;
      this.ptype = this.todos[this.project_no[this.realIndex]][this.pick].type;
    }
  },
  methods: {
    // todoを加える。
    addTodo: function() {
      if (this.pexp > 5) this.pexp = 5
      this.todos[this.project_no[this.realIndex]].push({id: this.id_number,
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
      let proj = this.todos[this.project_no[this.realIndex]][this.pick]
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
    deleteItem: function(index, key) {
      if (!confirm('けしますか？')) {
        return;
      }
      this.todos[key].splice(index, 1);
    },
    // checkされたアイテムを消す。
    // computedに定義されたremainingをtodoに代入している。
    deleteCheckedItem: function() {
      if (!confirm('完了タスクをけしますか？')) {
        return;
      }

      this.todos[this.project_no[this.realIndex]] = this.remaining;
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
    }
  },
  computed: {
    // 完了していないタスクのみを抽出した配列を返す
    remaining: function() {

      return this.todos[this.project_no[this.realIndex]].filter((todo) => {
        return !todo.checked;
      })
    },
    // 完了済みタスクの経験値を合計して返す。
    calExp: function() {
      var totalExp = 0
      let a = ['main', 'rep', 'sub'];
      let v = this.todos
      a.forEach(function(p){
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

h3 {
  margin-top: 0px;
  margin-bottom: 5px;
}

.swiper {
  align-content: center;
  padding-left: auto;
  padding-right: auto;
  padding-bottom: 10px;
  overflow: scroll;
  height: 300px;
}

.peke {
  color: blue;
  cursor: pointer;
}

.delete-task{
  display: flex;
}

.container {
  text-align: left;
  background: rgba(150, 150, 255, 1);
  margin-top: 3px;
  margin-bottom: 4px;
  display: flex;
  padding: 2px;
  border-radius: 4px;
  box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);

}

.todo-btn {
  display: block;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.checkbox {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
}


.otherperson {
  color: rgb(160, 160, 160);
  background: rgb(200, 200, 255);
}

.wait {
  color: rgb(210, 210, 210);
  background: rgba(200, 227, 255, 1);
}

</style>
