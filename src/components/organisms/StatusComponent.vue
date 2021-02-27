<!-- ステータスアップコンポーネント -->
<template>
  <div style="width: 100%;">
    <MonsterView :imgs="img"/>
    <LevelData :level="lvdata.lv" :exp="lvdata.exp" :point="lvdata.pt" style="margin-bottom: 10px;"/>
    <div class="status-block">
      <StatusPanel v-for="(item,index) in sts"
        :key="index"
        :item="item.itm"
        :value="item.vl"
        :point="item.pt" 
        :class="item.cl"
        @click="countUp(index)"
        />
    </div>
    <Button @click=ptToVl title="ポイント反映"></Button>
    <Button @click=ptToSkpt title="キャンセル"></Button>
    <Button @click=clear title="clear"></Button>
    <!-- デバッグ用。うつしてないがとりあえず保存しておくが消しても良い 21/2/27。 -->
    <div v-show=false>
      <Button @click=expstockToExp title="経験値反映"></Button>
      <input id="inputexp" type="number" v-model="lvdata.stexp">
      <label for="inputexp"></label>
    </div>
  </div>
</template>

<script>
import StatusPanel from '../molecules/StatusPanel'
import LevelData from '../molecules/LevelData'
import Button from '../atoms/Button'
import MonsterView from '../atoms/MonsterView'

export default {
  name: "StatusComponent",
  components: {
    StatusPanel,
    LevelData,
    Button,
    MonsterView,
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
        stexp: 0
      },
      img: require('/public/imgs/yuusya_game.png')
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

      if (value >= levelUPValue) {
        this.lvdata.lv++;
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
    this.lvdata = JSON.parse(localStorage.getItem('leveldata')) || {lv: 1, exp: 0, pt: 0, stexp: 0};

  },
  methods: {
    // スキルポイントを各ステータスに割り振る
    countUp: function(n) {
      if (this.lvdata.pt <= 0) {
        return;
      }
      
      new Audio(require("/public/media/button01a.mp3")).play();

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
    // 全データのリセット。デバッグ用。
    clear: function() {
      if (confirm("OK!?")) {
        if (confirm('ほんとに!?')) {
          if (confirm("真的吗？")) {
            localStorage.clear();
            alert('ぼうけんのしょがきえました')
          }
        }
      }
    }
  }

}
</script>

<style scoped>

.box1 {
  width: 100%;
  background-color: orange;
}

.box2 {
  width: 100%;
  background-color: lightblue;
}

.box3 {
  width: 100%;
  background-color: lightgreen;
}

.status-block {
  display: flex;
}

</style>