<template>
  <td :title="title">
    {{ title }}<span v-show="isshow" class="errorMsg">あたいをいれてね</span>
  </td>
</template>

<script>
export default {
  name: 'input-box-title',
  props: {
    title: String,
    isshow: Boolean,
    class: String
  }
}
</script>

<style scoped>
.errorMsg {
  color: rgb(255, 50, 50);
  font-size: 50%;
}

.box {
  text-align: left;
  margin: 1px;
  width: 40%;
  float: left;
  height: 1.5em;
  font-size: 10pt;
}
</style>