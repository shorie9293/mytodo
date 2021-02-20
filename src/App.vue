<template>
  <div id="App">
    <StatusComponent/>
  </div>
</template>

<script>
import StatusComponent from './components/organisms/StatusComponent'

export default {
  name: 'App',
  components: {
    StatusComponent
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
