<template>
  なまえ<input v-model="parsonal.name">
  しょくぎょう<input v-model="parsonal.job">
  <Button title="ゲームスタート" @click="setNameandJob" />
</template>

<script>
import Button from '../atoms/Button'

export default {
  name: 'SingUP',
  components: {
    Button
  },
  data: function(){
    return {
      parsonal: {
        name: 'HOGEHOGE',
        job: 'ゆうしゃ'
      }
    }
  },
  methods:{
    setNameandJob: function(){
      if (confirm('なまえとしょくぎょうはこれでいいですか？')) {
        
        localStorage.setItem('parsonal', JSON.stringify(this.parsonal));
        localStorage.setItem('firstSetting', 'ture')      
      }
    }

  } 
}
</script>

<style scoped>

</style>