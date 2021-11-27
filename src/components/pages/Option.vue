<template>
<div>

  <table>
    <tr>
      <th>なまえ: </th>
      <th><input class="inputarea" type="text" v-model="parsonal.name"></th>
    </tr>
    <tr>
      <th>
        しょくぎょう:
      </th>
      <th>
        <select  class="inputarea" name="job" id="job" v-model="parsonal.job">
          <option v-for="(job, index) in jobs"
            name="question"
            :key="index"
            :value="job">{{ job }}</option>
        </select>
      </th>
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
    <tr>
      <th>アーカイブ:</th>
      <th>
        <input id="is_archive_todos" type="checkbox" :checked="show_archive" @change="show_archive = !show_archive">
        <label for="is_archive_todos">チェックで表示</label>
      </th>
    </tr>
  </table>

  <Button @click="setOptions" title="オプション反映"/>
  <Button @click=clear title="全てのデータを消去する"/>
  <ConvertJsonToIndexedDB />
  <BackUpTodo />
  <Button @click="show=true" title="ReadMe"/>

  <!-- お試し機能 -->

  <div v-show="show">
    <Readme></Readme>
    <Button title="とじる" @click="show=false"/>
  </div>
  
  <div></div>
  <read-custom-q v-show="false"></read-custom-q>
    
  <SarchTodo v-show="false" />

  <Button title="TestSingleton" @click="singleton" />
</div>

</template>

<script>
import Button from "@/components/atoms/Button";
import Readme from '../pages/Readme';
import ReadCustomQ from '../organisms/ReadCustomQ';
import SarchTodo from '../test/SarchTodo.vue';
import ConvertJsonToIndexedDB from '@/components/organisms/ConvertJsonToIndexedDB';
import BackUpTodo from "@/components/organisms/BackUpTodo.vue";
import Singleton from "../test/Singleton";

export default {
  components: {
    Button,
    Readme,
    ReadCustomQ,
    SarchTodo,
    ConvertJsonToIndexedDB,
    BackUpTodo,
  },
  props: {
    class: String
  },
  data() {
    return {
      initialQuestion: '',
      settingJob: '',
      parsonal: '',
      questionType: {
        math: "さんすう",
        word: "たんご",
        custom: "カスタム"
      },
      jobs: [
        'ゆうしゃ',
        'せんし',
        'まほうつかい'
      ],
      show: false,
      show_archive: true,
    }
  },
  mounted: function() {
    this.parsonal = JSON.parse(localStorage.getItem('parsonal')) || {name:'hoge', job: ''} ;
    this.initialQuestion = JSON.parse(localStorage.getItem('initq')) || '' ;
    this.show_archive = Boolean(JSON.parse(localStorage.getItem('show_archive')));

  },
  watch: {
    'show_archive': {
      handler: function() {
        localStorage.setItem('show_archive', JSON.stringify(this.show_archive));
      },
      deep: true,
    } 
  },
  methods: {
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