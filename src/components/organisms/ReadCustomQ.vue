<template>
  <table>
    <tr>
      <td>
        <label for="file" class="filelabel">
          <span v-if="fn">
            {{ fn }}
          </span>
          <span v-else>
            選択
          </span>
        </label>
        <input type="file" name="filename" id="file" class="fileinput"
          @change="readFile" accept=".maguro">
      </td>
      <td>
        <Button title="変更" @click="makeJson"/>
      </td>
      <td v-show="questionObject[0].title">
        {{questionObject[0].title}}        
      </td>
    </tr>

  </table>
</template>

<script>
import Button from '../atoms/Button'
// import InputFile from '../atoms/InputFile'

export default {
  components: {
    Button
  },
  data: function(){
    return {
      counter: '',
      fn: '',
      txt: '',
      q_index: -1,
      questionObject: [{"title": ""},[]]
    }
  },
  mounted: function() {
    this.questionObject =JSON.parse(localStorage.getItem('customQuestion')) || [{"title": ""},[]]
  },
  methods: {
    readFile: function(event){
      let file = event.target.files[0];
      if (!file) {return false;}
      this.fn = file.name;
      let temp = this
      let reader =  new FileReader()
      reader.onload = function(e) {
        temp.txt = e.target.result;
      }
      reader.readAsText(file)
    },
    makeJson: function() {
      if (!confirm`カスタム問題を書き換えますか？※形式によってはバグになります。`) {
        return;
      }
      localStorage.setItem('customQuestion', this.txt)
      this.questionObject =JSON.parse(localStorage.getItem('customQuestion'))
   }
  }
}
</script>

<style scoped>
.filelabel{
    width: auto;
    margin: 5px 1px;
    background: hsl(0, 0%, 50%);
    color: white;
    padding: 5px 20px;
    border-radius: 4px;
    box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);
    transition: background 0.3s;
    cursor: pointer;
    user-select: none;
    margin-right: auto;
    margin-left: auto;

}
.filelabel:hover{
    background: hsl(0, 0%, 60%);

}

.fileinput{
  display: none;
}


</style>