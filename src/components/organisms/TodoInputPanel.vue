<template>
  <div class="component">
    <div class="input-box">
      <dl>
        <input-box-title :class="dt-box" :title="'プロジェクト'" :isshow="isProject"/>
        <dd>
          <select class="inp-b" name="project" id="pr" v-model="todoinfo.project">
            <option value="main">メイン</option>
            <option value="repeat">くりかえし</option>
            <option value="sub">サブ</option>
          </select>
        </dd>
        <input-box-title class="dt" :title="'タイトル'" :isshow="isInputTitle"/>
        <dd><input class="inp-b" type="text" v-model="todoinfo.value"/></dd>
        <input-box-title class="dt" :title="'けいけんち'" :isshow="isInputExp"/>
        <dd><input class="inp-b" type="number" min=0 max=5 v-model="todoinfo.exp"/></dd>
        <input-box-title class="dt" :title="'しゅるい'" :isshow="isType"/>
        <dd>
          <select class="inp-b" name="type" id="ty" v-model="todoinfo.type">
            <option value="nexttask">次の行動</option>
            <option value="otherperson">連絡待ち</option>
            <option value="wait">待機</option>
          </select>
        </dd>
      </dl>
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
      isProject: false,
      isInputExp: false,
      todoinfo: {
        value: "",
        exp: 0,
        type: "",
        project: "",
        e: 0
      }
    }
  },
  methods: {
    addTodo: function(e){
      if (!this.checkInput()) {
        this.todoinfo.e = e
        this.$emit('get-todo-info', this.todoinfo)
      }
    },
    checkInput: function() {
      this.isInputTitle = false;
      this.isInputExp = false;
      this.isType = false;
      this.isProject = false;
      
      if (this.todoinfo.value == '') {
        this.isInputTitle = true;
      }

      if (this.todoinfo.exp == '') {
        this.isInputExp = true;
      }

      if (this.todoinfo.project == '') {
        this.isProject = true;
      }

      if (this.todoinfo.type == '') {
        this.isType = true;
      }

      if (this.isInputTitle || this.isInputExp || this.isProject || this.isType) {
        return true;
      }

    },

  }
}
</script>

<style scoped>

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
    float: left;
    width: 100px;
    height: 1.5em;
    margin: 2px;
  }

  .component {
    display: flex;
    background: rgb(198, 198, 248);
    margin: 10px;
    padding: 5px;
  }
</style>