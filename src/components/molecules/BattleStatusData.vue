<!-- 自分と敵のHPを表示するパーツ  -->
<template>
  <dl class="data">
    <StatusData item="じぶんのHP" :value="myHp"/>
    <StatusData item="てきのHP" :value="enHp"/>
    <StatusData item="おかね" :value="money"/>
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
    enHp: Number,
    money: Number
  }  
}
</script>

<style scoped>
  .data {
    width: 30%;
  }
</style>