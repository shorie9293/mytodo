<!-- 各コンポーネント表示用 -->
<template>
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
  <Footer :displayMenus="displayMenus" @setDisplay="setDisplay"/>
</template>

<script>
import TodoComponent from '../organisms/TodoComponent.vue'
import StatusComponent from '../organisms/StatusComponent.vue'
import BattleComponent from '../organisms/BattleComponent.vue'
import Option from '../pages/Option'
import Footer from '../organisms/Footer.vue'

export default {
  name: 'QuestTemplate',
  components: {
    StatusComponent,
    BattleComponent,
    TodoComponent,
    Option,
    Footer
  },
  data: function() {
    return{
      display: 2,
      displayMenus: [
        {"title":"HOME", "display": false, "img": "todo.png"},
        {"title":"BTL", "display": false, "img": "todo.png"},
        {"title":"TODO", "display": true, "img": "todo.png"},
        {"title":"OPT", "display": false, "img": "todo.png"}
      ],

    }
  },
  methods: {
    setDisplay: function(index) {
      this.displayMenus[this.display].display = false;
      this.displayMenus[index].display = true;
      this.display = index;
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
    background-image: url(./../../assets/imgs/06.jpg);
    background-repeat: repeat;
  }

  .btns {
    display: flex;
    padding: 5px;
    width: 98%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 0px;
  }

  .btn {
    vertical-align: center;
    padding: 5px 5px;
    width: 95%;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 0px;
  }
</style>
