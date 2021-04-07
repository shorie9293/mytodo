<!-- ITEM: VALUEと表示するパーツ -->

<template>
  <dt class="item">{{ item }}</dt>
  <dd class="value">{{ value }}</dd>
</template>

<script>

export default {
  name: "StatusData",
  props: {
    item: String,
    value: Number
  }
}

</script>

<style scoped>
  .item {
    float: left;
    height: 1.2em;
    text-align: left;
  }
  .item::after {
    content: ":";
  }
  .value {
    text-align: right;
    height: 1.2em;
  }

</style>