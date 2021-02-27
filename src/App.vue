<template>
  <div id="App">
    <h1>マグロクエスト</h1>
    <h2>~{{name}}のぼうけん~</h2>
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
  data() {
    return {
      name: "HOGEHOGE"
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

h1 {
  margin: 0px;
}
h2 {
  margin: 0px;
}

</style>
