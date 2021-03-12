<template>
  <div class="component">
    <div class="input-box">
      <table>
        <tr>
          <input-box-title class="dt" :title="'タイトル'" :isshow="isInputTitle"/>
          <td><input class="inp-b" type="text" v-model="todoinfo.value"/></td>
        </tr>
        <tr>
          <input-box-title class="dt" :title="'けいけんち'" :isshow="isInputExp"/>
          <td><input class="inp-b" type="number" min=0 max=5 v-model="todoinfo.exp"/></td>
        </tr>
        <tr>
          <input-box-title class="dt" :title="'しゅるい'" :isshow="isType"/>
          <td>
            <select class="inp-b" name="type" id="ty" v-model="todoinfo.type">
              <option value="nexttask">次の行動</option>
              <option value="otherperson">連絡待ち</option>
              <option value="wait">待機</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
    <div class="btn-box">
      <Button @click="addTodo(0)" title="くわえる"/>
      <Button @click="addTodo(1)" title="へんこうする"/>
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
      todoinfo: {
        value: "",
        exp: 0,
        type: "",
        e: 0
      }
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
      
      if (this.todoinfo.value == '') {
        this.isInputTitle = true;
      }

      if (this.todoinfo.exp == '') {
        this.isInputExp = true;
      }

      if (this.todoinfo.type == '') {
        this.isType = true;
      }

      if (this.isInputTitle || this.isInputExp || this.isType) {
        return true;
      }

    },

  }
}
</script>

<style scoped>
  table {
    text-align: left;
    font-size: 12pt;
  }

  tr {
    height: 2em;
  }
  .input-box {
    width: 60%;
    margin-top: auto;
    margin-bottom: auto;
  }
  
  .dt-box {
    padding: 100px;
    width: 30%;
    text-emphasis:inherit;
    background: honeydew;
  }
  
  .btn-box {
    margin-top: auto;
    margin-bottom: auto;

  }

  .inp-b {
    width: 100%;
    height: 100%;
    margin: 2px;
    padding: 0;
  }

  .component {
    display: flex;
    background: rgb(198, 198, 248);
    margin: 10px;
    padding: 5px;
  }
</style>