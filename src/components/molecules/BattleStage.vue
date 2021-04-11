<template>

  <div class="battle-map">
    <div v-for="(stage,index) in reverseStages"
      :key="stage.id"
      :class="stage.cls"
      @click="selectStage(stage.id)">
      <div class="tower-container">
        <StatusData :item="stage.stg" :value="wins[index]"/>
      </div>
    </div>
    最初の塔
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
      return this.stages.slice().reverse();
    },
  }

}
</script>

<style scoped>

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