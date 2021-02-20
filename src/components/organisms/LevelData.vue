<template>
  <table>
    <StatusData item="レベル" :value="level" class="tb"/>
    <StatusData item="けいけんち" :value="exp" class="tb"/>
    <StatusData item="ポイント" :value="point" class="tb"/>
  </table>
</template>

<script>
import StatusData from '../molecules/StatusData'

export default {
  name: "LevelData",
  components: {
    StatusData
  },
  props: {
    level: Number,
    exp: Number,
    point: Number
  }  
}
</script>

<style scoped>
  table {
    display: table-row;
    width: 200px;
    border-collapse: collapse;
  }
  .tb {
    border-bottom: 1px solid;
  }
</style>