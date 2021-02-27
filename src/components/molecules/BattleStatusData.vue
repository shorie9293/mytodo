<!-- 自分と敵のHPを表示するパーツ  -->
<template>
  <dl class="data">
    <StatusData item="じぶんのHP" :value="myHp"/>
    <StatusData item="てきのHP" :value="enHp"/>
  </dl>

</template>

<script>
import StatusData from '../molecules/StatusData'

export default {
  name: "BattleStatusData",
  components: {
    StatusData
  },
  props: {
    myHp: Number,
    enHp: Number
  }  
}
</script>

<style scoped>
  .data {
    width: 30%;
  }
</style>