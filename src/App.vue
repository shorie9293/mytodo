<template>
  <div id="App">
    <h1>マグロクエスト</h1>
    <h2>~{{parsonal.job}} {{parsonal.name}} のぼうけん~</h2>
    <div>
      <div v-if="firstSetting">
        なまえ<input type="text" v-model="parsonal.name">
        しょくぎょう
        <select size="1" v-model="parsonal.job">
          <option v-for="job in jobs" 
              :key="job"
              :value="job"> {{ job }}
          </option>

        </select>
        <Button title="ゲームスタート" @click="setNameandJob" />
      </div>
      <div v-else-if="show==true">
        <Button title="とじる" @click="show=false"></Button>
        <Readme></Readme>
      </div>
      <QuestTemplate v-else/>
    </div>
    <span @click="show=true" style="margin-right: 0;">読んでね</span>
  </div>
</template>

<script>
import Button from './components/atoms/Button';
import QuestTemplate from './components/template/QuestTemplate'
import Readme from './components/organisms/Readme';

export default {
  name: 'App',
  components: {
    QuestTemplate,
    Button,
    Readme
  },
  data() {
    return {
      firstSetting: 'hoge',
      parsonal: {name:'hoge', job: ''},
      jobs: [
        "ゆうしゃ",
        "せんし",
        "まほうつかい"
      ],
      show: false
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
