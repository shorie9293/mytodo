<template>

<div>
  <Button title="SaveFile" @click="saveLog" />
  <input ref="file" class="file-button" type="file" @change="loadLog" />
</div>
  
</template>

<script>
import {saveAs} from "file-saver";
import TodoDBAdapter from "@/assets/js/TodoDBAdapter";
import Button from "@/components/atoms/Button";

export default {
  components: {
    Button,
  },
  methods: {
    
    saveLog: async function() {
      if (!confirm("バックアップしますか？")) {
          return;
      }

      const db = TodoDBAdapter;
      db.createDB();
      const todos_now = await db.getQuery();
      const blob = new Blob([JSON.stringify(todos_now)], {type:"application/json"});
      saveAs(blob, "hello world.json");
    },

    async loadLog (event) {

      if (!confirm("バックアップファイルを読み込みますか？")) {
          return;
      }

      const db = TodoDBAdapter;
      db.createDB();
      const files = event.target.files || event.dataTransfer.files
      const file = files[0]

      if (!this.checkFile(file)) {
          alert("ファイルを読み込めませんでした");
          return;
      }

      const logData = await this.getFileData(file);

      const logJson = JSON.parse(logData);

      logJson.forEach(todo => {
        if (todo['project'] == 'archive') {
          return;
        }

        db.addTodo(todo);
      });

      alert("todoを読み込みました。");

    },

    getFileData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    },

    checkFile(file) {
        if (!file) {
            return false;
        }

        if (file.type !== 'application/json') {
            return false;
        }

        const SIZE_LIMIT = 5000000 // 5MB
        if (file.size > SIZE_LIMIT) {
            return false;
        }
        return true;
    },
  },

}

</script>

<style>


</style>