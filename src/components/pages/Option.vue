<template>
  <table>
    <tr>
      <th>なまえ: </th>
      <th><input class="inputarea" type="text" v-model="parsonal.name"></th>
    </tr>
    <tr>
      <th>
        もんだい:
      </th>
      <th>
        <select  class="inputarea" name="question" id="q" v-model="initialQuestion">
          <option v-for="(question, index) in questionType"
            name="question"
            :key="index"
            :value="question">{{ question }}</option>
        </select>
      </th>
    </tr>
  </table>

  <read-custom-q v-show="false"></read-custom-q>

  <standard-button @click="setOptions" title="オプション反映"/>
  <standard-button @click=clear title="全てのデータを消去する"></standard-button>
  <standard-button @click="show=true" title="ReadMe"/>
  <div v-show="show">
    <Readme></Readme>
    <standard-button title="とじる" @click="show=false"></standard-button>
  </div>

</template>

<script>
import StandardButton from "../atoms/Button";
import Readme from '../pages/Readme';
import ReadCustomQ from '../organisms/ReadCustomQ';

export default {
  components: {
    StandardButton,
    Readme,
    ReadCustomQ
  },
  props: {
    class: String
  },
  data() {
    return {
      initialQuestion: '',
      parsonal: '',
      questionType: {
        math: "さんすう",
        word: "たんご",
        custom: "カスタム"
      },
      show: false
    }
  },
  mounted: function() {
    this.parsonal = JSON.parse(localStorage.getItem('parsonal')) || {name:'hoge', job: ''} ;
    this.initialQuestion = JSON.parse(localStorage.getItem('initq')) || '' ;
  },
  methods: {
    setOptions: function() {
      if (confirm("設定を反映しますか？")) {
        localStorage.setItem('parsonal', JSON.stringify(this.parsonal));
        localStorage.setItem('initq', JSON.stringify(this.initialQuestion));
      } 
    },
    // 全データのリセット。デバッグ用。
    clear: function() {
      if (confirm("OK!?")) {
        if (confirm('ほんとに!?')) {
          if (confirm("真的吗？")) {
            localStorage.clear();
            alert('ぼうけんのしょがきえました')
          }
        }
      }
    }  

  }

}
</script>

<style scoped>
  tr {
    text-align: left;
  }
  .inputarea {
    width: 100%;
  }
</style>