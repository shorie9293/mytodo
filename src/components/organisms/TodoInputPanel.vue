<template>
  <div class="component">
    <table>
      <tr>
        <input-box-title class="input-title" :title="'タイトル'" :isshow="isInputTitle"/>
        <td><input class="inp-box" type="text" v-model="todoinfo.value"/></td>
      </tr>
      <tr>
        <input-box-title class="input-title" :title="'けいけんち'" :isshow="isInputExp"/>
        <td><input class="inp-box" type="number" min=0 max=5 v-model="todoinfo.exp"/>
        <span v-show="isNumber" class="smalltext"><br>あたいがおおきい</span></td>
      </tr>
      <tr>
        <input-box-title :title="'しゅるい'" :isshow="isType"/>
        <td>
          <select class="select-box" name="type" id="ty" v-model="todoinfo.type">
            <option value="nexttask">次の行動</option>
            <option value="otherperson">連絡待ち</option>
            <option value="wait">待機</option>
          </select>
        </td>
      </tr>
    </table>

    <div class="btn-box">
      <Button class="btn" @click="addTodo(0)" title="くわえる"/>
      <Button class="btn" @click="addTodo(1)" title="へんこうする"/>
    </div>

  </div>

</template>

<script>
import InputBoxTitle from '../atoms/InputBoxTitle.vue'
import Button from '../atoms/Button'

export default {
  name: 'todo-input-panel',
  components: {
    InputBoxTitle,
    Button
  },
  data: function(){
    return {
      isInputTitle: false,
      isType: false,
      isInputExp: false,
      isNumber: false,
      todoinfo: {
        value: "",
        exp: 0,
        type: "",
        e: 0
      },
      btn: '.btn'
    }
  },
  methods: {
    // ボタンを押すとイベントをとばす
    addTodo: function(e){
      let b = false
      if (e == 0) {
        b = this.checkInput()
      }
      if (!b) {
        this.todoinfo.e = e
        this.$emit('get-todo-info', this.todoinfo)
      }
    },
    checkInput: function() {
      this.isInputTitle = false;
      this.isInputExp = false;
      this.isType = false;
      this.isNumber = false;
      
      if (this.todoinfo.value == '') {
        this.isInputTitle = true;
      }

      if (this.todoinfo.exp == '') {
        this.isInputExp = true;
      } else if (this.todoinfo.exp > 5) {
        this.isNumber =true;
      }

      if (this.todoinfo.type == '') {
        this.isType = true;
      }

      if (this.isInputTitle || this.isInputExp || this.isType || this.isNumber) {
        return true;
      }

    },

  }
}
</script>

<style scoped>
  table {
    width: 70%;
  }

  tr {
    height: 2em;
    width: auto;
    margin: 0px;
  }

  .smalltext {
    font-size: 5pt;
    color: red;
  }

  .btn-box {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    width: 30%;
  }

  .inp-box {
    width: 60%;
    height: 100%;
    margin: 2px;
    padding: 2px;
  }

  .select-box {
    width: 60%;
    height: 100%;
    margin: 2px;
    padding: 2px;

  }
  .component {
    display: flex;
    background: rgb(198, 198, 248);
    margin: 5px;
    padding: 5px;
  }

  .btn {
    padding: 5px 1px;
  }

</style>