<template>
  <div class="box">
    <table class="status-data">
      <StatusData :item="item" :value="value"/>
      <StatusData item="ポイント" :value="point"/>
    </table>
  </div>
</template>

<script>
import StatusData from '../molecules/StatusData'

export default {
  name: "StatusPanel",
  components: {
    StatusData
  },
  props: {
    item: String,
    value: Number,
    point: Number
  },
  methods: {
    countUp: function(p) {
      return p + 1;
    }
  }
}

</script>

<style scoped>
  .status-data {
    table-layout: fixed;
    width: 100%;
  }
  .box {
    width: auto;
    height: auto;
    padding: 5px;
    vertical-align: middle;
    display: table-cell;
    cursor: pointer;
    user-select: none;
  }
</style>