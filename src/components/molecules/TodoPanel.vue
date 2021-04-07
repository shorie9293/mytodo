<!-- Todoの内容を表示するパーツ -->
<template>
  <input :id="forid" class="checkbox" type="checkbox" :checked="checked" @change="changeChecked($event)">
  <label :for="forid">
    <div>
      <div class="val" :class="classofvalue">{{ value }}</div>
      <div class="tasks-detail">
        <div class="task-d exp">{{ exp }} / {{ initialExp }}</div>
        <div class="task-d type">{{ taskType }}</div>
      </div>
    </div>
  </label>
  <input :id="forid" type="radio" name="todoitems" :value="index" @change="changeRadioButton($event)">
  <div @click="deleteItem" class="peke"> [x]</div>

</template>

<script>
export default {
  name: 'TodoPanel',
  emits:[
    'delete-item',
    'select'
  ]
  ,
  props: {
    forid: Number,
    value: String,
    exp: Number,
    initialExp: Number,
    classofvalue: Object,
    taskType: String,
    checked: Boolean,
    keyValue: String,
    index: Number
  },
  methods: {
    changeChecked: function(e) {
      this.$emit('update:checked', e.target.checked)
    },
    changeRadioButton: function(e) {
      this.$emit('update:select', e.target.value)
    },
    deleteItem: function() {
      this.$emit('delete-item', {"key": this.keyValue, "index": this.index})
    }
  }
}
</script>

<style scoped>

.finished {
  color:gold;
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
  background:rgba(242, 244, 246, 1);
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

.checkbox {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
}

</style>