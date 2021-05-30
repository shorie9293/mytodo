<template>
  <div class="cover-all-display">
    <div class="component">
      <p>本日の定期クエスト</p>
      <ul>
        <li v-for="todo in repeated_todo"
          :key="todo.index">
          {{ todo.title }}
        </li>
      </ul>
      <div class="buttons">
        <Button title="OK" @click="confirmLogin" />
      </div>
    </div>
  </div>
</template>

<script>
// import TodoDBAdapter from '@/assets/js/TodoDBAdapter'
import Button from '@/components/atoms/Button'

export default {
  props: {
    repeated_todo: Object
  },
  components: {
    Button,
  },
  emits: [
    'closeLoginPanel'
  ],
  // data: function() {
  //   return {
  //     db: Object,
  //   }
  // },
  // mounted: function() {
  //   this.db = TodoDBAdapter;
  //   this.db.createDB();
  // },
  methods: {
    confirmLogin: function() {
      console.log('hoge');
      this.$emit('closeLoginPanel');
    }
  }
}
</script>

<style scoped>
ul {
  padding-left: 20px;
  margin: 0px;
}

.component {
  text-align: left;
  position: relative;
  margin: auto;
  padding: 5px;
  height: 200px;
  width: 200px;
  background: gold;
  border-radius: 10px;
}

.buttons {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 200px;
  text-align: center;
  /* margin-bottom: 0px */
}

.cover-all-display {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(100, 100, 100, 0.8);
  z-index: 100000;
  /* vertical-align: middle; */
}
</style>