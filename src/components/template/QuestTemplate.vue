<template>
  <div class="display-panel">
    <template v-if="display">
      <StatusComponent class="component"/>
    </template>
    <template v-else>
      <BattleComponent class="component"/>
    </template>
  </div>
  <div class="btn">
    <Button title="SELECT" @click="display = !display"/>
  </div>
</template>

<script>
import Button from '../atoms/Button'
import StatusComponent from '../organisms/StatusComponent'
import BattleComponent from '../organisms/BattleComponent'

export default {
  name: 'QuestTemplate',
  components: {
    Button,
    StatusComponent,
    BattleComponent
  },
  data: function() {
    return{
      display: true
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