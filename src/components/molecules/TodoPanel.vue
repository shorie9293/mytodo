<!-- Todoの内容を表示するパーツ -->
<template>
  <label :for="forid">
    <div>
      <div class="val" :class="classofvalue">{{ value }}</div>
      <div class="tasks-detail">
        <div class="task-d exp">{{ exp }} / {{ initialExp }}</div>
        <div class="task-d type">{{ taskType }}</div>
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
  vertical-align: middle;
  position: relative;
}

.task-d {
  background: white;
  padding: 2px;
  margin: 2px;
  border: .1mm solid;
  text-align: center;
  border-radius: 4px;
}

.exp {
  width: 60px;
  padding-top: 5px;
}

.type {
  width: 80px;
}

.val {
  font-family: Arial, Helvetica, sans-serif;
  margin: 1px;
  padding: 1px;
  width: 100%;
}
</style>