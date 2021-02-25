<template>
  <div class="display-panel">
    <template v-if="display==0">
      <StatusComponent class="component"/>
    </template>
    <template v-else-if="display==1">
      <BattleComponent class="component"/>
    </template>
    <template v-else>
      <TodoPanel class="component"/>
    </template>
  </div>
  <div class="btn">
    <Button title="SELECT" @click="selectComp"/>
  </div>
</template>

<script>
import Button from '../atoms/Button'
import StatusComponent from '../organisms/StatusComponent'
import BattleComponent from '../organisms/BattleComponent'
import TodoPanel from '../organisms/TodoPanel.vue'


export default {
  name: 'QuestTemplate',
  components: {
    Button,
    StatusComponent,
    BattleComponent,
    TodoPanel
  },
  data: function() {
    return{
      display: 0,
      comp: 3
    }
  },
  methods: {
    selectComp: function() {
      if (this.display == this.comp - 1) {
        this.display = 0
      } else {
        this.display++
      }
    }
  }
}
</script>

<style scoped>
  .component {
    margin-right: auto;
    margin-left: auto;
  }

  .display-panel {
    padding: 10px;
    margin-right: auto;
    margin-left: auto;
    width: 80%;
    height: 500px;
    background-color: bisque;

  }

  .btn {
    padding: 10px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
  }
</style>