<!-- レベルに関するデータを表示するパーツ  -->
<template>
  <dl>
    <StatusData item="レベル" :value="level"/>
    <StatusData item="けいけんち" :value="exp"/>
    <StatusData item="ポイント" :value="point"/>
    <StatusData item="おかね" :value="money"/>
  </dl>
</template>

<script>
import StatusData from './StatusData'

export default {
  name: "LevelData",
  components: {
    StatusData
  },
  props: {
    level: Number,
    exp: Number,
    point: Number,
    money: Number
  }  
}
</script>

<style scoped>

  dl {
    display: block;
    width: 50%;
  }

</style>