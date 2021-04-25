<!-- Todoの内容を表示するパーツ -->
<template>
  <div :class="['container', classType]">
    <div class="check-area">
      <input :id="'todo' + forid"  class="checkbox" type="checkbox" :checked="checked" @change="changeChecked($event)">
      <label :for="'todo' + forid"></label>
    </div>
    <div class="task-area">
      <div class="val">「{{ value }}」<span v-if="task[taskType]" :class="classofvalue">を{{ comp }}</span></div>
      <div v-if="task[taskType]" class="tasks-detail">
        <div class="task-d exp">{{ exp }}/{{ initialExp }}</div>
        <div class="task-d type">{{ task[taskType] }}</div>
      </div>
    </div>
    <div v-if="task[taskType]" class="todo-btn">
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
    classType: String,
  },
  data: function() {
    return {
      comp : '達成せよ。',
      task : {
        "nexttask" : "次の行動",
        "otherperson" : "連絡待ち",
        "wait" : "待機",
      },
    }
  },
  methods: {
    changeChecked: function(e) {
      this.$emit('update:checked', e.target.checked)
      this.comp = e.target.checked ? '達成した!!' : '達成せよ。'
    },
    changeRadioButton: function(e) {
      this.$emit('update:select', e.target.value)
    },
    // deleteItem: function() {
    //   this.$emit('delete-item', {"key": this.keyValue, "index": this.index})
    // }
    deleteItem: function() {
      this.$emit('delete-item', this.index)
    }
  }
}
</script>

<style scoped>

.finished {
  color:rgba(255, 217, 0, 0.589);
  text-shadow: 1px 1px 2px silver;
  /* font-style: italic; */
  font-weight: bold;
  /* letter-spacing: 0.2em; */
}

.tasks-detail {
  display: flex;
  width: 100%;
  vertical-align: middle;
  position: relative;
}

.task-d {
  background:rgba(240, 240, 240, 1);
  padding: 2px;
  margin: 2px;
  border: .1mm solid;
  border-color: rgb(140, 140, 140);
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

.check-area {
  margin-left: 30px;
  width: 50px;
  display: flex;
  /* background: red; */
}

.checkbox {
  height: 100px;
  display:none;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  margin-left: 10px;
}

.check-area input[type="checkbox"]+ label {
  margin-top: auto;
  margin-bottom: auto;
  
    /* display: block; */
  width: 45px;
  height: 42px;
  /* background: yellow; */
  background-image: url(./../../assets/imgs/todo/checkbox.png);
  background-size: 90%;
  background-repeat: no-repeat;
}

.check-area input[type="checkbox"]:checked+ label {
  background-image: url(./../../assets/imgs/todo/finish.png);
}

.task-area {
  display: block;
  width: 80%;
}

.todo-btn {
  display: block;
  width: 50px;
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
  /* background: rgba(150, 150, 255, 1); */
  margin-top: 3px;
  margin-bottom: 4px;
  display: flex;
  padding: 2px;
  border-radius: 4px;
  /* box-shadow: 2px 2px rgba(0, 0, 0, 0.5); */
  background-color: white;
  background-image: url(./../../assets/imgs/hisui-1.jpg);
  background-size: 400px auto;
  background-repeat: repeat-y;
  /* border: 3px solid rgba(70, 70, 70, 0.3); */

}

.otherperson {
  color: rgb(160, 160, 160);
  /* background: rgb(200, 200, 255); */
}

.wait {
  color: rgb(230, 230, 230);
  /* background: rgba(200, 227, 255, 1); */
}

/* 
.val {
  font-family: "001Shirokuma";
} */

</style>