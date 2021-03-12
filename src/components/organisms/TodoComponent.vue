<!-- TODOを表示するパネル
TODOの機能はこのコンポーネントで完結できるようにする。 -->
<template>

  <swiper ref="mainSwiper"
    :slides-per-view="1" 
    :space-between="10"
    :scrollbar= "{ draggable: true }"
    :realIndex="realIndex"
    :controller="{ control: controlledSwiper }"
    @swiper="setControlledSwiper"
    @slideChange="getRealIndex"
    class="swiper"
    >
      <swiper-slide v-for="(todo, key) in todos" :key="key">
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
  <todo-input-panel @get-todo-info="setTodo"></todo-input-panel>
  <Button @click="enhanceExp" title="けいけんちアップ"/>
  <div class="delete-task">
    <Button @click="deleteCheckedItem" title="かんりょうずみをけす"/>
    <select name="project" id="pr" v-model="deleteproject">
        <option v-for="(p, key) in project_name"
          :key="key" 
          :value="key">{{ p }}
          </option>
    </select>
  </div>
  <Button @click="hoimi" title="けいけんちかいふく"/>
</template>

<script>
import Button from '../atoms/Button';
import TodoPanel from '../molecules/TodoPanel.vue';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper';
import 'swiper/components/scrollbar/scrollbar.scss';
import TodoInputPanel from './TodoInputPanel.vue';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Controller]);

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
      todo_title: '',
      todo_exp: '',
      id_number: 0,
      isInputTitle: false,
      isInputPro: false,
      isInputExp: false,
      pick: 'none',
      project: "",
      project_name: {
        "main" : "メイン",
        "rep" : "繰り返し",
        "sub" : "サブ"
      },
      tasktype: {
        "nexttask" : "次の行動",
        "otherperson" : "連絡待ち",
        "wait" : "待機",
        
      },
      currenttodo: 'hoge',
      deleteproject: '',
      realIndex: 0,
      controlledSwiper: null
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
        localStorage.setItem('todos_main', JSON.stringify(this.todos["main"]));
        localStorage.setItem('todos_sub', JSON.stringify(this.todos.sub));
        localStorage.setItem('todos_rep', JSON.stringify(this.todos.rep));
        localStorage.setItem('todoid', JSON.stringify(this.id_number));
      },
      deep: true
    }
  },
  methods: {
    
    // todoを加える。変更かどうかで場合分けしている。
    setTodo: function(todoinfo){
      
      let v = todoinfo
      let vm = this

      if (todoinfo.e == 0) {
        addTodo(vm, v)
      } else if (todoinfo.e == 1) {
        changeTodo(vm, v, this.pick)
      }

      function addTodo(vm, v) {
        let proj
        if (todoinfo.project == "main") {
          proj = vm.todos.main
        } else if (todoinfo.project == "repeat") {
          proj = vm.todos.rep
        } else if (todoinfo.project == "sub") {
          proj = vm.todos.sub
        }
        proj.push({id: vm.id_number,
          value: v.value,
          exp: v.exp,
          initialExp: v.exp,
          type: v.type,
          checked: false});
         vm.id_number++;
         todoinfo.value = '';
         todoinfo.exp = '';
         todoinfo.type = '';
      }
      function changeTodo(vm, v, pick) {
        let proj
        if (todoinfo.project == "main") {
          proj = vm.todos.main
        } else if (todoinfo.project == "repeat") {
          proj = vm.todos.rep
        } else if (todoinfo.project == "sub") {
          proj = vm.todos.sub
        }
        v.value != '' ? proj[pick].value = v.value : ''
        v.exp != '' ? proj[pick].exp = v.exp : ''
        v.exp != '' ? proj[pick].initialExp = v.exp : ''
        v.type != '' ? proj[pick].type = v.type : ''
      }
    },
    // [x]ボタンを押すとtodoを消す
    deleteItem: function(index, key) {
      if (!confirm('けしますか？')) {
        return;
      }
      this.todos[key].splice(index, 1);
      this.todo_title = '';
    },
    // checkされたアイテムを消す。
    // computedに定義されたremainingをtodoに代入している。
    deleteCheckedItem: function() {
      if (!confirm('完了タスクをけしますか？')) {
        return;
      }

      if (this.deleteproject == '') {
        alert('プロジェクトをえらんでください');
        return;
      }

      this.todos[this.deleteproject] = this.remaining;
    },
    // かんりょうずみタスクの経験値を反映。
    // computedのcalExpを使っている。
    enhanceExp: function() {
      if (!confirm('けいけんちをはんえいしますか？')) {
        return;
      }
      this.leveldata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();

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
    setControlledSwiper(swiper) {
      this.controlledSwiper = swiper;
    },
    function: getRealIndex {
      this.realIndex = this.controlledSwiper.realIndex
    }
  },
  computed: {
    // 完了していないタスクのみを抽出した配列を返す
    remaining: function() {

      return this.todos[this.deleteproject].filter((todo) => {
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
  margin: 5px;
}

.swiper {
  height: 100%;
  padding: 10px;
}

.inputError {
  color: red;
  font-size: 50%;
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
  margin: 5px;
  display: flex;
  padding: 5px;
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
