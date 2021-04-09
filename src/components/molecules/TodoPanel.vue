<!-- Todoの内容を表示するパーツ -->
<template>
  <div :class="['container', classType]">
    <input :id="'todo' + forid" class="checkbox" type="checkbox" :checked="checked" @change="changeChecked($event)">
    <label :for="'todo' + forid">
      <div>
        <div class="val" :class="classofvalue">{{ value }}</div>
        <div class="tasks-detail">
          <div class="task-d exp">{{ exp }} / {{ initialExp }}</div>
          <div class="task-d type">{{ taskType }}</div>
        </div>
      </div>
    </label>
    <div class="todo-btn">
      <input :id="'radio' + forid" type="radio" name="todoitems" :value="index" @change="changeRadioButton($event)">
      <label :for="'radio' + forid" v-show="false">{{ index }}</label>
      <div @click="deleteItem" class="peke"> [x]</div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'TodoPanel',
  emits:[
    'delete-item',
    'update:select',
    'update:checked'
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
    index: Number,
    classType: String
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

.todo-btn {
  display: block;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.peke {
  color: blue;
  cursor: pointer;
}

.delete-task{
  display: flex;
}

.container {
  text-align: left;
  background: rgba(150, 150, 255, 1);
  margin-top: 3px;
  margin-bottom: 4px;
  display: flex;
  padding: 2px;
  border-radius: 4px;
  box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);

}



.otherperson {
  color: rgb(160, 160, 160);
  background: rgb(200, 200, 255);
}

.wait {
  color: rgb(210, 210, 210);
  background: rgba(200, 227, 255, 1);
}

</style>