<!-- Todoの内容を表示するパーツ -->
<template>
  <label :for="forid">
    <div>
      <div class="val" :class="classofvalue">{{ value }}</div>
      <div class="tasks-detail">
        <div class="task-d">{{ exp }} / {{ initialExp }}</div>
        <div class="task-d">{{ taskType }}</div>
      </div>
    </div>
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
    classofvalue: Object,
    taskType: String
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

.tasks-detail {
  display: flex;
  width: 100%;
}

.task-d {
  background: white;
  margin: 1px;
  padding: 1px;
  width: 100%;
  border: .1mm solid;
}

.val {
  font-family: Arial, Helvetica, sans-serif;
  margin: 1px;
  padding: 1px;
  width: 100%;
}
</style>