<!-- ステータスアップコンポーネント -->
<template>
  <Flash :show="show"/>

  <div class="char-component">
    <div class="status" v-show="show_status">
      <div style="height: 150px;">
        <ImageView :imgs="img"/>
      </div>
      <level-data :level="lvdata.lv" :exp="lvdata.exp" :point="lvdata.pt" :money="lvdata.money" style="margin-bottom: 10px;"/>
    </div>
    <div class="todos">

      <div class="todonow">
        <div v-for="t in todos_now" :key="'todo' + t.id">
          <TodoPanel 
            :todo="t"
            :classofvalue="{'finished' : t.checked}"
            v-model:checked="t.checked"
            @delete-task="deleteTask(t.index)"
          />

        </div>
      </div>
      <div class="finish-button">
        <Button @click="enhanceExp" title="FINISH!!"/>
      </div>
    </div>
  </div>
  
    <div class="status-block">
      <status-panel v-for="(item,index) in sts"
        :key="index"
        :item="item.itm"
        :value="item.vl"
        :point="item.pt" 
        :class="item.cl"
        @click="countUp(index)"
        />
    </div>
    <Button @click=ptToVl title="ポイント反映"/>
    <Button @click=ptToSkpt title="キャンセル"/>
    <Button @click="show_status = !show_status" :title="place"/>

    <!-- デバッグ用。うつしてないがとりあえず保存しておくが消しても良い 21/2/27。 -->
    <div v-show=false>
      <Button @click=expstockToExp title="経験値反映"/>
      <input id="inputexp" type="number" v-model="lvdata.stexp">
      <label for="inputexp"></label>
    </div>
</template>

<script>
import StatusPanel from '../molecules/StatusPanel'
import Button from '../atoms/Button'
import ImageView from '../atoms/ImageView.vue'
import LevelData from '../molecules/LevelData.vue'
import TodoPanel from '../molecules/TodoPanel'
import Flash from '../molecules/Flash'
import TodoDBAdapter from '@/assets/js/TodoDBAdapter'

export default {
  name: "StatusComponent",
  components: {
    StatusPanel,
    LevelData,
    Button,
    ImageView,
    TodoPanel,
    Flash
  },
  props: {
    todo_added: Object,
  },
  data: function(){
    return {
      sts: [
        {itm: "HP", vl: 12, pt: 0, cl:"box1"},
        {itm: "AT", vl: 4, pt: 0, cl:"box2"},
        {itm: "DF", vl: 1, pt: 0, cl:"box3"}
        ],
      lvdata: {
        lv: 1,
        exp: 0,
        pt: 0,
        stexp: 0,
        money: 0
      },
      // img: require(`@/assets/imgs/player/yuusya_game.webp`),
      img: require(`@/assets/imgs/player/yusha2.png`),
      personal: {},
      todos: [],
      pick: 0,
      show: false,
      place: '@OFFICE',
      show_status: '',
      db: Object
    }
  },
  watch: {
    // 各変更に対して値をlocalstrageに格納
    'sts': {
      handler: function() {
        localStorage.setItem('status', JSON.stringify(this.sts));
        localStorage.setItem('leveldata', JSON.stringify(this.lvdata));
      }, 
      deep: true
    },
    'lvdata': {
      handler: function() {
        localStorage.setItem('leveldata', JSON.stringify(this.lvdata));
      }, 
      deep: true
    },
    'lvdata.exp': function(value) {
      let levelUPValue = 30;
      let lvupPoint = 10;

      if (value >= levelUPValue) {
        this.lvdata.lv++;
        this.lvdata.pt += lvupPoint;
        this.lvdata.exp -= levelUPValue;
        localStorage.setItem('leveldata', JSON.stringify(this.lvdata));
      }

    },
    'todos': {
      handler: async function() {
        if (!Object.keys(this.todos).length) {
          return;
        }
        
        await this.db.changeChecked(this.todos);

      },
      deep: true
    },
    'show_status': function() {
      localStorage.setItem('office_mode', JSON.stringify(!this.show_status));
      this.place = this.show_status ? "@PARSONAL" : "@OFFICE";
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
  mounted: async function() {
    this.sts = JSON.parse(localStorage.getItem('status')) || [
      {itm: "HP", vl: 12, pt: 0, cl:"box1"},
      {itm: "AT", vl: 4, pt: 0, cl:"box2"},
      {itm: "DF", vl: 1, pt: 0, cl:"box3"}
    ];
    this.lvdata = JSON.parse(localStorage.getItem('leveldata')) || {lv: 1, exp: 0, pt: 0, stexp: 0, money: 0};
    this.parsonal = JSON.parse(localStorage.getItem('parsonal')) || {name:'hoge', job: ''} ;
    // this.todos = JSON.parse(localStorage.getItem('doit_now')) || [];
    if (this.parsonal.job == "ゆうしゃ") {
      // this.img = require(`@/assets/imgs/player/yuusya_game.webp`)
      this.img = require(`@/assets/imgs/player/yusha2.png`)
    } else if (this.parsonal.job == "まほうつかい") {
      // this.img = require(`@/assets/imgs/player/magic.webp`)
      this.img = require(`@/assets/imgs/player/mahou2.png`)
    } else if (this.parsonal.job == "せんし") {
      // this.img = require(`@/assets/imgs/player/senshi.webp`)
      this.img = require(`@/assets/imgs/player/senshi2.png`)
    } else {
      this.img = require(`@/assets/imgs/player/rpg.webp`)
    }
    this.show_status = JSON.parse(localStorage.getItem('office_mode'));
    this.show_status = !this.show_status;

    this.db = TodoDBAdapter;
    await this.db.createDB();
    this.todos = await this.db.getQuery();
  },
  methods: {
    // スキルポイントを各ステータスに割り振る
    countUp: function(n) {
      if (this.lvdata.pt <= 0) {
        return;
      }
      
      new Audio(require(`@/assets/media/button01a.mp3`)).play();

      this.sts[n].pt += 1
      this.lvdata.pt -= 1

    },
    // スキルポイントの反映
    ptToVl: function() {
      this.sts.forEach(element => {
        element.vl += element.pt
        element.pt = 0
      });
    },
    // スキルポイントのキャンセル
    ptToSkpt: function() {
      this.sts.forEach(element => {
        this.lvdata.pt += element.pt
        element.pt = 0
      });
    },
    enhanceExp: async function() {

      if (this.count_checked === 0) {
        return;
      }
      
      this.lvdata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();
      this.todos = await this.db.finishTask();

      this.show=true;

      let v = this;
      setTimeout(function(){
        v.show=false;
        },600);

      // localStorage.setItem('leveldata', JSON.stringify(this.leveldata))
    },
    deleteTask: async function(index) {
      if (!confirm('タスクを削除しますか？')) {
        return;
      }
      
      this.todos = await this.db.deleteTodo(index);

    },
    // デバッグ用。いまのところ保存 210207
    expstockToExp: function() {
      if (this.lvdata.stexp <= 0) {
        return;
      }
      this.lvdata.exp += Number(this.lvdata.stexp);
      this.lvdata.stexp = 0;
    },
   },
   computed: {

    calExp: function() {
      var totalExp = 0
      this.todos.forEach(function(todo){
        if (todo.checked) {
          totalExp += Number(todo.exp);
          todo.exp = 0;
        }
      })
      return totalExp;
    },
    remaining: function() {
      return this.todos.filter((todo) => {
        return !todo.checked;
      })
    },
    count_checked: function() {
      
      let counter = 0;
      this.todos.forEach(function(todo) {
        if (todo.checked) {
          counter++
        }
      })
      return counter;
    },
    todos_now: function() {
      return this.todos.filter((value) =>{
        return value.project == 'now'
      })
    },


  },


}
</script>

<style scoped>
.todonow {
  background: rgba(201, 231, 231, 0.6);
  height: 87%;
  margin: 1px;
  padding: 3px;
  position: relative;
  vertical-align: top;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1);;
  scrollbar-width: none;
}

.todonow::-webkit-scrollbar {
  display: none;
}

.todos {
  position: relative;
  width: 100%;
  height: auto;
  margin: 5px;
}

.char-component {
  display: flex;
  width: 100%;
  height: 300px;
  margin-right: auto;
  margin-left: auto;
}

.status {
  width: 40%;
  height: auto;
  margin: 5px;
  }

.box1 {
  width: 100%;
  background: hsl(40, 100%, 50%);
  transition: background 0.3s;
}

.box2 {
  width: 100%;
  background: hsl(200, 100%, 70%);
  transition: background 0.3s;
}

.box3 {
  width: 100%;
  background: hsl(100, 100%, 60%);
  transition: background 0.3s;
}

.box1:hover {
  background: hsl(40, 100%, 60%);
}

.box2:hover {
  background: hsl(200, 100%, 80%);
}

.box3:hover {
  background: hsl(100, 100%, 70%);
}

.status-block {
  display: flex;
}

</style>