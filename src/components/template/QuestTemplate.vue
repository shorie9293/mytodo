<!-- 各コンポーネント表示用 -->
<template>
  <div class="btns">
    <standard-button title="HOME" @click="display=0" class="btn" :class="{ selected : display != 0 }"/>
    <standard-button title="BTL" @click="display=1" class="btn" :class="{ selected : display != 1 }"/>
    <standard-button title="TODO" @click="display=2" class="btn" :class="{ selected : display != 2 }"/>
    <standard-button title="OPT" @click="display=3" class="btn" :class="{ selected : display != 3 }"/>
  </div>
  <div class="display-panel">
    <template v-if="display==0">
      <status-component class="component"/>
    </template>
    <template v-else-if="display==1">
      <battle-component class="component"/>
    </template>
    <template v-else-if="display==2">
      <todo-component class="component"/>
    </template>
    <template v-else>
      <Option class="component"/>
    </template>
  </div>
</template>

<script>
import StandardButton from '../atoms/Button'
import TodoComponent from '../organisms/TodoComponent.vue'
import StatusComponent from '../organisms/StatusComponent.vue'
import BattleComponent from '../organisms/BattleComponent.vue'
import Option from '../pages/Option'

export default {
  name: 'QuestTemplate',
  components: {
    StandardButton,
    StatusComponent,
    BattleComponent,
    TodoComponent,
    Option,
  },
  data: function() {
    return{
      display: 2,
      comp: 3,
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
    width: 95%;
    height: 100%;
    background-color: rgb(196, 227, 255);
  }

  .btns {
    display: flex;
    padding: 5px;
    width: 95%;
    margin-right: auto;
    margin-left: auto;
  }

  .btn {
    vertical-align: center;
    padding: 5px 5px;
    width: 100%;
    margin-left: 1px;
    margin-right: 1px;
  }

  .selected {
    background-color: lightgray;
  }
</style>
