<template>
  <div class="btns">
    <div v-for="(menu, index) in displayMenus"
      :key="index"
      class="btn"
      >
      <!-- <ImageButton :title="menu.title" @click="getIndex(index)" :class="{selected: !menu.display}"
      :src="require(`@/assets/imgs/${menu.img}`)"
      :art="menu.title" /> -->
      <Button :title="menu.title" @click="getIndex(index)" :class="{selected: !menu.display}"
      />
    </div>
  </div>
</template>

<script>
import Button from '../atoms/Button'
// import ImageButton from '../atoms/ImageButton'

export default {
  components: {
    Button,
    // ImageButton
  },
  props: {
    displayMenus: Array,
    display: Boolean
  },
  data: function() {
    return {
      img: "todo.png"
    }
  },
  methods: {
    getIndex: function(index) {
      this.$emit('setDisplay', index);
    }
  },
  computed: {
    displayMenuChange: function() {
      return this.displayMenus.forEach( v => {
        v.img = require(`@/assets/imgs/${v.img}`);
        // require(`@/assets/imgs/${this.enemyDatabase[index].img}`)
      }
      )
    }
  }
}
</script>

<style scoped>

.btns {
  display: flex;
  height: auto;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  padding: 0pt;
  width: 100%;
}
  
.btn {
  padding: 0pt;
  vertical-align: center;
  /* width: 100px; */
  flex: 1;
  margin-top: 0px;
}

  
.selected {
    background: hsl(0, 0%, 70%);

    /* background: rgba(200, 255, 200, 1);
    border: 3px solid rgb(100, 200, 100,1); */
}


</style>