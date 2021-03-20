<template>
  <div>
    なまえ: <input type="text" v-model="parsonal.name">
  </div>
  <div>
    もんだい: 
    <select name="question" id="q" v-model="initialQuestion">
      <option v-for="(question, index) in questionType"
        name="question"
        :key="index"
        :value="question">{{ question }}</option>
    </select>
  </div>
  <Button @click="setOptions" title="オプション反映"/>
  <Button @click=clear title="全てのデータを消去する"></Button>
</template>

<script>
import Button from "../atoms/Button"

export default {
  components: {
    Button
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

</style>