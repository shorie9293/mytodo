<!-- ステータスを表示するボックス -->

<template>
  <div class="box">
    <dl class="status-data">
      <StatusData :item="item" :value="value"/>
      <StatusData item="PT" :value="point"/>
    </dl>
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
  }
}

</script>

<style scoped>
  .status-data {
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