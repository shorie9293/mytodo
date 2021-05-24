<!-- Todoの内容を表示するパーツ -->
<template>
  <div :class="['container', classType]">
    <div class="check-area">
      <input :id="'todo' + todo.index"
        class="checkbox"
        type="checkbox"
        :checked="checked"
        @change="changeChecked($event)">
      <label :for="'todo' + todo.index"></label>
    </div>
    <div class="task-area">
      <div class="val"><span v-if="task[todo.type]" :class="classofvalue">
        「</span>{{ todo.title }}<span v-if="task[todo.type]" :class="classofvalue">」を{{ comp }}</span>
      </div>
      <div v-show="todo.project == 'archive' " >
        完了日: {{todo.finish_date}}
      </div>
      <div v-show="(todo.project !== 'now') && (todo.project !== 'archive')" class="tasks-detail">
        <div class="task-d exp">{{ todo.exp }}/{{ todo.exp_init }}</div>
        <div class="task-d type">{{ task[todo.type] }}</div>
      </div>
      <div v-show="todo.project == 'repeat' " >
        繰り返し頻度: {{todo.repeated}}, 繰り返し設定: {{todo.repeated_day}}
      </div>
    </div>
      <div v-show="(todo.project !== 'now') && (todo.project !== 'archive')" class="peke" >
        <fa @click="editTask" icon="feather-alt" type="fas" class="fas fa-feather-alt"></fa>

        <span class="margin" v-show="(todo.project !== 'now') && (todo.project !== 'archive')"></span>
        
        <fa v-show="(todo.project !== 'repeat')" @click="sentTask($event)" icon="exchange-alt" type="fas"  class="fas fa-exchange-alt"></fa>
      </div>
  </div>

</template>

<script>
// import Button from '@/components/atoms/Button'

export default {
  inheritAttrs: false,
  name: 'TodoPanel',
  components: {
  },
  emits:[
    'edit-task',
    'sent-task',
    'update:checked'
  ],
  // components: {
  //   Button,
  // },
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
    todo: Object,
  },
  data: function() {
    return {
      isComp : '',
      // TodoInputBoxと重複あり
      task : {
        "nexttask" : "次の行動",
        "otherperson" : "連絡待ち",
        "wait" : "待機",
      },
    }
  },
  methods: {
    changeChecked: function(e) {
      this.$emit('update:checked', e.target.checked);
    },
    changeRadioButton: function(e) {
      this.$emit('update:select', e.target.value)
    },
    // deleteItem: function() {
    //   this.$emit('delete-item', {"key": this.keyValue, "index": this.index})
    // }
    sentTask: function() {
      // console.log(`sent task: ${event.target}`);
      this.$emit('sent-task');
    
      // this.$emit('delete-item', this.index)
      // this.$emit('delete-item', this.index)
    },
    editTask: function() {
      // console.log(`editTask: ${this.index}`);
      this.$emit('edit-task');
    }
  },
  computed: {
    comp: function() {
      return this.checked ? `達成した!!` : '達成せよ。'
    }
  }
}
</script>

<style scoped>
.fas {
  margin-top: 1px;
  margin-bottom: 1px;
}

.margin{
  height: 5px;
}

.fa-exchange-alt {
  color: blue;
  height: 20px;
  width: 20px;
  cursor: pointer;
  /* margin: 2px; */
}

.fa-feather-alt {
  color: orange;
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.raido-button {
  display: none;
}

.radio-label {
  font-size: 10pt;
}

.finished {
  text-shadow: 1px 1px 2px silver;
  font-weight: bold
}
  
.tasks-detail {
  display: flex;
  width: 100%;
  vertical-align: middle;
  position: relative;
  font-size: 10pt;
}

.task-d {
  background:rgba(240, 240, 240, 1);
  margin-left: 2px;
  border: .1mm solid;
  border-color: rgb(140, 140, 140);
  text-align: center;
  border-radius: 4px;
}

.exp {
  width: 60px;
  padding-top: 3px;
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
  padding-right: 5px;
  height: auto;
  text-align: center;
  display: flex;
  display:-webkit-box;
  display:-ms-flexbox;
  flex-flow: column;
  margin-top: auto;
  margin-bottom: auto;
}

.delete-task{
  display: flex;
}

.container {
  text-align: left;
  /* background: rgba(150, 150, 255, 1); */
  width: 98%;
  margin-top: 3px;
  margin-bottom: 4px;
  display: flex;
  padding: 3px;
  border-radius: 4px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
  background-image: url(./../../assets/imgs/hisui-1.jpg);
  background-size: 400px auto;
  background-repeat: repeat-y;
  /* border: 3px solid rgba(70, 70, 70, 0.3); */
  justify-content: space-between;

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