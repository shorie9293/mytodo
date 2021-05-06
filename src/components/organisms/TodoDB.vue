<template>
  <div>hoge</div>
</template>

<script>
import UUID from 'vue-uuid';
import Dexie from 'dexie';

export default {
  setup() {
    
  },
  data: function() {
    return{
      db: Dexie,
      todo_list: [],
    }
  },
  mounted: function() {
    let vm = this

    createDB();

    async function createDB() {
      vm.db = new Dexie('maguro-db');
      vm.db.version(1).stores({todo_table: 'id, project, title, type'});
      vm.db.on("populate", vm.populate);
      vm.todo_list = await vm.db.todo_table.toArray();
    }

  },
  methods: {
    populate: async function() {
      const id = new UUID.v4();
      console.log(id);
      await this.db.friends.bulkAdd([
        {name: "dammy-A", shoeSize:24.5, add: "test1"},
      ]);
    },
  },
  
}
</script>

<style scoped>

</style>