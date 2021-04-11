<template>
  <div class="btns">
    <div v-for="(menu, index) in displayMenus"
      :key="index"
      >
      <Button :title="menu.title" @click="getDisplay(index)" class="btn" :class="{ selected : menu.display }"/>

    </div>
  </div>
</template>

<script>
import Button from '../atoms/Button'

export default {
  components: {
    Button
  },
  data: function() {
    return {
      displayMenus: [
        
      ]
    }
  },
  methods: {
    getDisplay: function(index) {
      this.displayMenus.forEach( value => {
        value.display = false;
      })
      console.log(this.displayMenus[index].display)
      this.displayMenus[index].display = true;
      console.log(this.displayMenus[index].display)
      this.$emit('setDisplay', index);
    }
  }
}
</script>

<style scoped>

.selected {
  background-color: lightgray;
}


.btn {
  vertical-align: center;
  padding: 5px 5px;
  /* width: 100%;
  margin-left: 10px;
  margin-right: 2px; */
  margin-top: 0px;
}

.btns {
  display: flex;
  padding: 5px;
  width: 98%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
}



</style>