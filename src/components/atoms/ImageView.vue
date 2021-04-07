<!-- モンスター(というよりイメージ)を表示する -->
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
    height: 100%;
    }
</style>