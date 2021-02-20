<template>
  <div class="bt">{{ title }}</div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String
  }  
}
</script>

<style scoped>
  .bt {
    width: auto;
    margin-top: 5px;
    background-color: gray;
    color: white;
    padding: 5px;
    cursor: pointer;
  }
</style>
