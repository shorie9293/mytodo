<template>
  <div style="width: auto;">
    <LevelData :level="lvdata.lv" :exp="lvdata.exp" :point="lvdata.pt" style="margin-bottom: 10px;"/>
    <StatusPanel v-for="(item,index) in sts"
      :key="index"
      :item="item.itm"
      :value="item.vl"
      :point="item.pt" 
      :class="item.cl"
      @click="countUp(index)"
      />
    <Button @click=ptToVl title="ポイント反映"></Button>
    <Button @click=ptToSkpt title="キャンセル"></Button>
    <Button @click=expstockToExp title="経験値反映">PT</Button>
    <Button @click=clear title="clear">PT</Button>
    <input type="number" v-model="lvdata.stexp">
  </div>
</template>

<script>
import StatusPanel from './StatusPanel'
import LevelData from './LevelData'
import Button from '../atoms/Button'

export default {
  name: "StatusComponent",
  components: {
    StatusPanel,
    LevelData,
    Button
  },
  data: function(){
    return {
      sts: [
        {itm: "HP", vl: 0, pt: 0, cl:"box1"},
        {itm: "AT", vl: 0, pt: 0, cl:"box2"},
        {itm: "DF", vl: 0, pt: 0, cl:"box3"}
        ],
      lvdata: {
        lv: 1,
        exp: 0,
        pt: 100,
        stexp: 0
      }
    }
  },
  watch: {
    sts: {
      handler: function() {
        localStorage.setItem('status', JSON.stringify(this.sts));
        localStorage.setItem('leveldata', JSON.stringify(this.lvdata));
      }, 
      deep: true
    },
    lvdata: {
      handler: function() {
        localStorage.setItem('status', JSON.stringify(this.sts));
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
    this.sts = JSON.parse(localStorage.getItem('status'))  || [
      {itm: "HP", vl: 0, pt: 0, cl:"box1"},
      {itm: "AT", vl: 0, pt: 0, cl:"box2"},
      {itm: "DF", vl: 0, pt: 0, cl:"box3"}
    ];
    this.lvdata = JSON.parse(localStorage.getItem('leveldata'))  || {lv: 1, exp: 0, pt: 100, stexp: 0};

  },
  methods: {
    countUp: function(n) {
      if (this.lvdata.pt <= 0) {
        return;
      }
      this.sts[n].pt += 1
      this.lvdata.pt -= 1
    },
    ptToVl: function() {
      this.sts.forEach(element => {
        element.vl += element.pt
        element.pt = 0
      });
    },
    ptToSkpt: function() {
      this.sts.forEach(element => {
        this.lvdata.pt += element.pt
        element.pt = 0
      });
    },
    expstockToExp: function() {
      if (this.lvdata.stexp <= 0) {
        return;
      }
      this.lvdata.exp += Number(this.lvdata.stexp);
      this.lvdata.stexp = 0;
    },
    clear: function() {
      localStorage.setItem('status', JSON.stringify([
        {itm: "HP", vl: 0, pt: 0, cl:"box1"},
        {itm: "AT", vl: 0, pt: 0, cl:"box2"},
        {itm: "DF", vl: 0, pt: 0, cl:"box3"}
      ]));
      localStorage.setItem('leveldata', JSON.stringify({
        lv: 1, exp: 0, pt: 100, stexp: 0
      }));
    }
  }

}
</script>

<style scoped>

.box1 {
  background-color: orange;
}

.box2 {
  background-color: lightblue;
}

.box3 {
  background-color: lightgreen;
}

</style>