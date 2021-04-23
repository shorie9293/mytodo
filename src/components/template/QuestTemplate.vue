<!-- 各コンポーネント表示用 -->
<template>
  <div class="display-panel">
    <template v-if="display==0">
      <status-component />
    </template>
    <template v-else-if="display==1">
      <battle-component />
    </template>
    <template v-else-if="display==2">
      <todo-component />
    </template>
    <template v-else>
      <Option />
    </template>
    <Footer :displayMenus="displayMenus" @setDisplay="setDisplay"/>
  </div>
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
    Footer,

  },
  data: function() {
    return{
      display: 0,
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

</style>
