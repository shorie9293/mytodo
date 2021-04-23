<!-- ステータスアップコンポーネント -->
<template>

    <div class="char-component">
      <div class="status">
        <div style="height: 150px;">
          <ImageView :imgs="img"/>
        </div>
        <level-data :level="lvdata.lv" :exp="lvdata.exp" :point="lvdata.pt" :money="lvdata.money" style="margin-bottom: 10px;"/>
      </div>
      <div class="todos">
        <div v-for="(t, index) in todos" :key="t.id">
          <input :id="t.id" type="checkbox">
          <label :for="t.id" :title="t.value">{{ t.value }} {{ index }}</label>
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
// import TodoPanel from '../molecules/TodoPanel'

export default {
  name: "StatusComponent",
  components: {
    StatusPanel,
    LevelData,
    Button,
    ImageView,
    // TodoPanel
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
      todos: []
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

    }
  },
  mounted: function() {
    this.sts = JSON.parse(localStorage.getItem('status')) || [
      {itm: "HP", vl: 12, pt: 0, cl:"box1"},
      {itm: "AT", vl: 4, pt: 0, cl:"box2"},
      {itm: "DF", vl: 1, pt: 0, cl:"box3"}
    ];
    this.lvdata = JSON.parse(localStorage.getItem('leveldata')) || {lv: 1, exp: 0, pt: 0, stexp: 0, money: 0};
    this.parsonal = JSON.parse(localStorage.getItem('parsonal')) || {name:'hoge', job: ''} ;
    this.todos = JSON.parse(localStorage.getItem('todos_main')) || [];
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
    // デバッグ用。いまのところ保存 210207
    expstockToExp: function() {
      if (this.lvdata.stexp <= 0) {
        return;
      }
      this.lvdata.exp += Number(this.lvdata.stexp);
      this.lvdata.stexp = 0;
    },
   }

}
</script>

<style scoped>
.char-component {
  display: flex;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.status {
  background: yellow;
  width: 40%;
  margin: 5px;
  }

.todos {
  background: red;
  width: 60%;
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