<template>
  <div class="component">
    <table>
      <tr >
        <td><input id="taskname" class="inp-box"
          type="text"
          placeholder="タスク名" 
          :value="todotitle"
          @input.prevent="$emit('update:todotitle', $event.target.value)" />
          <label for="taskname" v-show="false">タスク名</label>
          <!-- <span v-show="isInputTitle" class="smalltext"><br>あたいをいれてね</span> -->
        </td>
      </tr>
      <tr>
        <td><input id="exp" class="inp-box"
          type="number" min=0 max=5
          placeholder="経験値 (1-5)"
          :value="todoexp"
          @input.prevent="$emit('update:todoexp', Number($event.target.value))"/>
          <label for="exp" v-show="false">経験値</label>
        <!-- <span v-show="isInputExp" class="smalltext"><br>あたいをいれてね</span> -->
        <!-- <span v-show="isNumber" class="smalltext"><br>あたいがおおきい</span> -->
        </td>
      </tr>
      <tr class="select-tr">
        <td>
          <select class="select-box" name="type" id="ty" :title="todotype" @change="$emit('update:todotype', $event.target.value)">
            <option value="nexttask">次の行動</option>
            <option value="otherperson">連絡待ち</option>
            <option value="wait">待機</option>
          </select>
        </td>
      </tr>
    </table>

    <div class="btn-box">
      <Button class="btn" @click="addTodo" title="くわえる"/>
      <Button class="btn" @click="changeTodo" title="へんこう"/>
      <Button class="btn" @click="clearInput" title="入力クリア"/>
    </div>

  </div>

</template>

<script>
import Button from '../atoms/Button'

export default {
  name: 'todo-input-panel',
  components: {
    Button
  },
  props: {
    msg: String,
    todotitle: String,
    todoexp: Number,
    todotype: String 
  },
  data: function(){
    return {
      isInputTitle: false,
      isType: false,
      isInputExp: false,
      isNumber: false,
      btn: '.btn',
    }
  },
  methods: {
    // ボタンを押すとイベントをとばす
    addTodo: function(){
      // if (!this.checkInput()) {
      //   this.$emit('add-todo')
      // }
      this.$emit('add-todo')
    },
    changeTodo: function() {
      this.$emit('change-todo')
    },
    clearInput: function() {
      this.$emit('clear-input')
    },
    // checkInput: function() {
      // this.isInputTitle = false;
      // this.isInputExp = false;
      // this.isNumber = false;
      
      // if (this.todotitle == '') {
      //   this.isInputTitle = true;
      // }

      // if (this.todoexp === '') {
      //   this.isInputExp = true;
      // } else if (this.todoexp > 5) {
      //   this.isNumber =true;
      // }

      // if (this.isInputTitle || this.isInputExp || this.isNumber) {
      //   return true;
      // }

    // },
  }
}
</script>

<style scoped>
  table {
    width: 70%;
  }

  tr {
    height: 2em;
    width: 100%;
    margin: 0px;
  }

  td {
    text-align: left;
    vertical-align: top;
  }

  /* .smalltext {
    font-size: 5pt;
    color: red;
  }
 */
  .btn-box {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    width: 30%;
  }

  .inp-box {
    width: calc(100% - 44px);
    height: 100%;
    margin-left: 0;

  }

  .select-box {
    width: calc(100% - 26px);
    height: 100%;
    padding: 2px;
    padding-left: 0px;

  }
  .component {
    display: flex;
    /* background: rgb(198, 198, 248); */
    background-image: url(./../../assets/imgs/paper.webp);
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);
    background-size: 100% 100%;
  }

  .btn {
    padding: 5px 1px;
  }

</style>