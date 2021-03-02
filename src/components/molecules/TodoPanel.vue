<!-- Todoの内容を表示するパーツ -->
<template>
  <label :for="forid">
    <span :class="classofvalue">{{ value }}</span>: {{ exp }} / {{ initialExp }}
  </label>

</template>

<script>
export default {
  name: 'TodoPanel',
  props: {
    forid: Number,
    value: String,
    exp: Number,
    initialExp: Number,
    classofvalue: Object
  }
}
</script>

<style scoped>

.finished {
  color:lightseagreen;
  font-style: italic;
  font-family: 'Times New Roman', 'ＭＳ Ｐゴシック', serif;
  font-weight: bold;
  letter-spacing: 0.2em;
}
</style>