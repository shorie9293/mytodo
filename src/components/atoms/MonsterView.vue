<template>
  <img class="monster" :src="imgs" alt="image">
</template>

<script>
export default {
  name: "MonsterView",
  props: {
    imgs: String
  }
}
</script>

<style scoped>
 .monster {
    width: 100px;
    }
</style>