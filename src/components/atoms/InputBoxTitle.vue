<template>
  <td class="text-size" :title="title">
    {{ title }} <br> <span v-show="isshow" class="errorMsg">あたいをいれてね</span>
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
  color: rgba(255, 80, 47,1);
  font-size: 50%;
}

.text-size {
  font-size: 12pt;
}

td {
  text-align: left;
  margin: 1px;
  width: 100px;
}
</style>