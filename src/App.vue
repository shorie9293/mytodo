<template>
  <div id="App">
    <QuestTemplate/>
  </div>
</template>

<script>
import QuestTemplate from './components/template/QuestTemplate'

export default {
  name: 'App',
  components: {
    QuestTemplate
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
