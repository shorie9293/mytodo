<template>
  <div class="hello">
  </div>
  <div v-for="data in todo_list"
    :key="data.title">
        {{data.project}}:{{ data.title }}
  </div>
  <TodoInputBox :show="show" 
    @add-todo="addData"
    v-model:todo-project="project"
    v-model:todo-title="title"
    v-model:todo-type="type"
    v-model:todo-exp="exp"
    />
  <FlortingButton @click="show = true"/>
  {{project}}
  <!-- {{ testdata }} -->
</template>

<script>
import Dexie from 'dexie';
import {uuid} from 'vue-uuid';
import FlortingButton from './FlortingButton'
import TodoInputBox from './TodoInputBox';

export default {
  name: 'HelloWorld',
  components: {
    FlortingButton,
    TodoInputBox,
  },
  props: {
    msg: String
  },
  data: function(){
    return {
      db: Dexie,
      todo_list: [],
      tablename: 'todo_table',
      project: '',
      title: '',
      type: 'Next Action',
      exp: 0,
      show: false,
    }
  },
  mounted: function(){
    let vm = this

    createDB();

    async function createDB() {
      vm.db = new Dexie('maguro-db');
      vm.db.version(1).stores({todo_table: '++index, id, project, title, type'});
      vm.db.on("populate", vm.populate);
      vm.todo_list = await vm.db.todo_table
        .orderBy('index')
        .reverse()
        .toArray();
    }
  },
  methods:{
    populate: async function() {
      const id = uuid.v4();
      await this.db.todo_table.bulkAdd([
        {id: id, project: 'Project 1', title: 'Start your Game!!', type: 'Next Action', exp: 0},
      ]);
    },
    deleteDB: function () {
      this.db.delete();
    },
    async addData(){
//      await this.db.open();
      console.log("add data");
      const id = uuid.v4();
      await this.db.todo_table.put({
        id: id, 
        project: this.project,
        title: this.title,
        type: this.type, 
        exp: this.exp});
      this.todo_list = await this.db.todo_table
        .orderBy('index')
        .reverse()
        .toArray();
      this.show = false;
    },
    async getData() {
      this.testdata = await this.db.table('friends').where('name').startsWithIgnoreCase('h').toArray();
    },
 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
