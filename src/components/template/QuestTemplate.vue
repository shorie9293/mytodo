<!-- 各コンポーネント表示用 -->
<template>
  <div class="display-panel">
    <template v-if="display==0">
      <status-component class="component"/>
    </template>
    <template v-else-if="display==1">
      <battle-component class="component"/>
    </template>
    <template v-else>
      <todo-component class="component"/>
    </template>
  </div>
  <div class="btns">
    <Button title="ステータス" @click="display=0" class="btn" :class="{ selected : display != 0 }"/>
    <Button title="バトル" @click="display=1" class="btn" :class="{ selected : display != 1 }"/>
    <Button title="やること" @click="display=2" class="btn" :class="{ selected : display != 2 }"/>
  </div>
</template>

<script>
import Button from '../atoms/Button'
import TodoComponent from '../organisms/TodoComponent.vue'
import StatusComponent from '../organisms/StatusComponent.vue'
import BattleComponent from '../organisms/BattleComponent.vue'

export default {
  name: 'QuestTemplate',
  components: {
    Button,
    StatusComponent,
    BattleComponent,
    TodoComponent,
  },
  data: function() {
    return{
      display: 2,
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
    border-radius: 10px;
    box-shadow: 1px 2px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-right: auto;
    margin-left: auto;
    width: 80%;
    height: 100%;
    background-color: rgb(196, 227, 255);
  }

  .btns {
    display: flex;
    padding: 10px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
  }

  .btn {
    width: 100%;
    margin-left: 5px;
    margin-right: 5px;
  }

  .selected {
    background-color: lightgray;
  }
</style>