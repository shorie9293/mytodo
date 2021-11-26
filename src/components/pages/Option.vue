<template>
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
  <Button @click="show=true" title="ReadMe"/>

  <!-- お試し機能 -->

  <Button title="SaveFile" @click="saveLog" />
  <input ref="file" class="file-button" type="file" @change="loadLog" />

  <div v-show="show">
    <Readme></Readme>
    <Button title="とじる" @click="show=false"/>
  </div>
  
  <read-custom-q v-show="false"></read-custom-q>
    
  <SarchTodo v-show="false" />

</template>

<script>
import Button from "../atoms/Button";
import Readme from '../pages/Readme';
import ReadCustomQ from '../organisms/ReadCustomQ';
import SarchTodo from '../test/SarchTodo.vue';
import ConvertJsonToIndexedDB from '@/components/organisms/ConvertJsonToIndexedDB';
import {saveAs} from "file-saver";
import TodoDBAdapter from "@/assets/js/TodoDBAdapter";

export default {
  components: {
    Button,
    Readme,
    ReadCustomQ,
    SarchTodo,
    ConvertJsonToIndexedDB,
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
    saveLog: async function() {
      const db = TodoDBAdapter;
      db.createDB();
      const todos_now = await db.getQuery();
      const blob = new Blob([JSON.stringify(todos_now)], {type:"application/json"});
      saveAs(blob, "hello world.json");
    },
    setOptions: function() {
      if (confirm("設定を反映しますか？")) {
        localStorage.setItem('parsonal', JSON.stringify(this.parsonal));
        localStorage.setItem('initq', JSON.stringify(this.initialQuestion));
      } 
    },
    async loadLog (event) {
        const files = event.target.files || event.dataTransfer.files
        const file = files[0]

        if (!this.checkFile(file)) {
            alert("ファイルを読み込めませんでした")
            return
        }

        const logData = await this.getFileData(file)

        const logJson = JSON.parse(logData)

        console.log(logJson);
    },

    getFileData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    },

    checkFile(file) {
        if (!file) {
            return false
        }

        if (file.type !== 'application/json') {
            return false
        }

        const SIZE_LIMIT = 5000000 // 5MB
        if (file.size > SIZE_LIMIT) {
            return false
        }
        return true
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