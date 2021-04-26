<!-- ステータスアップコンポーネント -->
<template>
  <Flash :show="show"/>
  <transition name="fade">
    <div class="flash" v-if="show">
    やったぜ！
    </div>
  </transition>

  <div class="char-component">
    <div class="status">
      <div style="height: 150px;">
        <ImageView :imgs="img"/>
      </div>
      <level-data :level="lvdata.lv" :exp="lvdata.exp" :point="lvdata.pt" :money="lvdata.money" style="margin-bottom: 10px;"/>
    </div>
    <div class="todos">

      <div class="todonow">
        <div v-for="(t, index) in todos" :key="'todo' + t.id">
          <!-- <input :id="t.id" type="checkbox">
          <label :for="t.id" :title="t.value">{{ t.value }} {{ index }}</label> -->
          <TodoPanel :forid="t.id"
          :value="t.value"
          :exp="Number(t.exp)"
          :initialExp="Number(t.initialExp)"
          :taskType="''"
          :classofvalue="{'finished' : t.checked}"
          :index="index"
          :classType="t.type"
          v-model:checked="t.checked"
          v-model:select="pick"
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
      img: require(`@/assets/imgs/player/yuusya_game.webp`),
      personal: {},
      todos: [],
      pick: 0,
      show: false,
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
      handler: function() {
        localStorage.setItem('doit_now', JSON.stringify(this.todos));
      },
      deep: true
    },

  },
  mounted: function() {
    this.sts = JSON.parse(localStorage.getItem('status')) || [
      {itm: "HP", vl: 12, pt: 0, cl:"box1"},
      {itm: "AT", vl: 4, pt: 0, cl:"box2"},
      {itm: "DF", vl: 1, pt: 0, cl:"box3"}
    ];
    this.lvdata = JSON.parse(localStorage.getItem('leveldata')) || {lv: 1, exp: 0, pt: 0, stexp: 0, money: 0};
    this.parsonal = JSON.parse(localStorage.getItem('parsonal')) || {name:'hoge', job: ''} ;
    this.todos = JSON.parse(localStorage.getItem('doit_now')) || [];
    if (this.parsonal.job == "ゆうしゃ") {
      this.img = require(`@/assets/imgs/player/yuusya_game.webp`)
    } else if (this.parsonal.job == "まほうつかい") {
      this.img = require(`@/assets/imgs/player/magic.webp`)
    } else if (this.parsonal.job == "せんし") {
      this.img = require(`@/assets/imgs/player/senshi.webp`)
    } else {
      this.img = require(`@/assets/imgs/player/rpg.webp`)
    }

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
    enhanceExp: function() {
      this.lvdata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();

      this.todos = this.remaining;

      this.show=true;

      let v = this;
      setTimeout(function(){
        v.show=false;
        },300);

      // localStorage.setItem('leveldata', JSON.stringify(this.leveldata))
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

  },


}
</script>

<style scoped>
/* aaaaaaaaaaaaaaaaaaaa */
.flash {
  display: grid;
  place-items: center;
  text-align: center;
  position: absolute;
  font-size: 48pt;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background: rgba(200, 255, 1, 0.8);
  z-index: 2147483647;
}
.fade-enter-from {
  /*開始の状態を指定する*/
  opacity: 0;
}
.fade-enter-to {
  /*終了の状態を指定する*/
  opacity: 1;
}
.fade-enter-active {
   /*動作（イージングや時間）を指定する*/
  transition: opacity 300ms ease-out;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 300ms ease-out;
}
.finish-button {
  position: absolute;
  bottom: 0pt;
  width: 100%;
}
/* aaaaaaaaaaaaaaaaaaaaa */
.todonow {
  height: 90%;
  margin: 5px;
  position: relative;
  vertical-align: top;
  overflow-y: scroll;
  overflow-x: hidden;
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