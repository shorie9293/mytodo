<template>

  <div class="battle-map">
    <div v-for="stage in reverseStages"
      :key="stage.id"
      :class="stage.cls"
      @click="selectStage(stage.id)">
      <div class="tower-container">
        <StatusData :item="stage.stg" :value="wins[stage.id]"/>
      </div>
    </div>
    <select name="stage" id="stage" v-model="stageName">
      <option v-for="(stageName, index) in stageNames"
        name="stage"
        :key="index"
        :value="stageName">{{ stageName }}</option>
    </select>
  </div>
  
</template>

<script>
import StatusData from "../atoms/StatusData"

export default {
  components: {
    StatusData
  },
  props: {
    wins: Array
  },
  data: function() {
    return {
      stages: [
        {id:0, stg:"F1", cls:"stg stg1"},
        {id:1, stg:"F2", cls:"stg stg2"},
        {id:2, stg:"F3", cls:"stg stg3"},
        {id:3, stg:"F4", cls:"stg stg4"},
        {id:4, stg:"F5", cls:"stg stg5"}        
      ],
      stages2: [
        {id:5, stg:"F6", cls:"stg stg1"},
        {id:6, stg:"F7", cls:"stg stg2"},
        {id:7, stg:"F8", cls:"stg stg3"},
        {id:8, stg:"F9", cls:"stg stg4"},
        {id:9, stg:"F10", cls:"stg stg5"}        
      ],
      stages3: [
        {id:10, stg:"F11", cls:"stg stg1"},
        {id:11, stg:"F12", cls:"stg stg2"},
        {id:12, stg:"F13", cls:"stg stg3"},
        {id:13, stg:"F14", cls:"stg stg4"},
        {id:14, stg:"F15", cls:"stg stg5"}        
      ],
      stageName: '最初の塔',
      stageNames: ['最初の塔', '絶望の塔', '天地の塔']
    }
  },
  methods: {
    selectStage: function(index) {
      this.$emit('get-stage-index', index);
    }
  },
  computed: {
    // 配列の要素順番を逆順にする
    reverseStages() {
      if (this.stageName == "最初の塔") {
        return this.stages.slice().reverse();
      } else if (this.stageName == "絶望の塔") {
        return this.stages2.slice().reverse();
      } else if (this.stageName == "天地の塔") {
        return this.stages3.slice().reverse();
      } else {
        return this.stages.slice().reverse();
      }
    },
  }

}
</script>

<style scoped>

.floor {
  width: 50px;
  margin-left: auto;
  margin-right: auto;
}

.battle-map {
  width: 50%;
}

.stg {
  height: 25px;
  width: 85%;
  margin-right: auto;
  margin-left: auto;
  cursor: pointer;
}

.stg1 {
  width: 72%;
  background: rgb(200, 170, 170);
}

.stg2 {
  width: 66%;
  background: rgb(200, 150, 150);
}

.stg3 {
  width: 60%;
  background: rgb(200, 130, 130);
}

.stg4 {
  width: 57%;
  background: rgb(200, 110, 110);
}
.stg5 {
  width: 54%;
  background: rgb(200, 90, 90);
}

.tower-container {
  margin-left: auto;
  margin-right: auto;
  width: 80px
}

</style>