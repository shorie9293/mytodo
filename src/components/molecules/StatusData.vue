<template>
  <tr class="data">
    <td class="item">{{ item }}</td>
    <td class="value">{{ value }}</td>
  </tr>
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
    text-align: left;
  }
  .item::after {
    content: ":";
  }
  .value {
    text-align: right;
    width: auto;
  }

</style>