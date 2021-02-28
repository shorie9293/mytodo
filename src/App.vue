<template>
  <div id="App">
    <h1>マグロクエスト</h1>
    <h2>~{{parsonal.job}} {{parsonal.name}}のぼうけん~</h2>
    <div>
      <div v-if="firstSetting">
        なまえ<input type="text" v-model="parsonal.name">
        しょくぎょう<input type="text" list="myjob" v-model="parsonal.job">
        <datalist id="myjob">
          <div v-for="job in jobs" :key="job">
              <option :value="job"></option>
          </div>

        </datalist>
        <Button title="ゲームスタート" @click="setNameandJob" />
      </div>
      <QuestTemplate v-else/>
    </div>
  </div>
</template>

<script>
import Button from './components/atoms/Button';
import QuestTemplate from './components/template/QuestTemplate'

export default {
  name: 'App',
  components: {
    QuestTemplate,
    Button,
  },
  data() {
    return {
      firstSetting: 'hoge',
      parsonal: {name:'hoge', job: ''},
      jobs: [
        "ゆうしゃ",
        "せんし",
        "まほうつかい"
      ]

    }
  },
  mounted: function(){
      this.$nextTick(function(){
        this.parsonal = JSON.parse(localStorage.getItem('parsonal')) || {name:'hoge', job: ''} ;
        // alert(JSON.parse(localStorage.getItem('firstSetting')));
        let flag = JSON.parse(localStorage.getItem('firstSetting'));
        if (flag==false) {
          this.firstSetting = false;
        } else {
          true;
        }
      })
   
  },
  methods:{
    setNameandJob: function(){
      if (confirm('なまえとしょくぎょうはこれでいいですか？')) {
        localStorage.setItem('parsonal', JSON.stringify(this.parsonal));
        localStorage.setItem('firstSetting', false);
        this.firstSetting = false
      } else {
        this.parsonal.name = "";
        this.parsonal.job = ""
      }
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
