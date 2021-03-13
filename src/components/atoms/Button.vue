<!-- //ボタンの再定義 -->
<template>
  <div class="bt" >{{ title }}</div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
  },  
}
</script>

<style scoped>
  .bt {
    width: auto;
    margin: 5px 1px;
    background: hsl(0, 0%, 50%);
    color: white;
    padding: 5px 20px;
    border-radius: 4px;
    box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);
    transition: background 0.3s;
    cursor: pointer;
    user-select: none;
    margin-right: auto;
    margin-left: auto;
  }

  .bt:hover {
    background: hsl(0, 0%, 60%);

  }
</style>
