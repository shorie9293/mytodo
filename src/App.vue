<template>
  <div id="App">
    <h1>マグロクエスト</h1>
    <h2>~{{parsonal.job}} {{parsonal.name}} のぼうけん~</h2>
    <div v-if="firstSetting">
      なまえ<input type="text" v-model="parsonal.name">
      しょくぎょう
      <select size="1" v-model="parsonal.job">
        <option v-for="job in jobs" 
            :key="job"
            :value="job"> {{ job }}
        </option>

      </select>
      <standard-button title="ゲームスタート" @click="setNameandJob" />
    </div>
    <QuestTemplate v-else/>
  </div>
</template>

<script>
import StandardButton from './components/atoms/Button';
import QuestTemplate from './components/template/QuestTemplate';
import TodoDBAdapter from '@/assets/js/TodoDBAdapter'


export default {
  name: 'App',
  components: {
    QuestTemplate,
    StandardButton,
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
      show: false,
      db: Object
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
    this.db = TodoDBAdapter;
    TodoDBAdapter.createDB();
  },
  methods:{
    setNameandJob: function(){
      if (confirm`なまえとしょくぎょうはこれでいいですか？
                ※なまえはあとからかえられます`) {
        localStorage.setItem('parsonal', JSON.stringify(this.parsonal))
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
@import url(https://fonts.googleapis.com/earlyaccess/notosanssc.css);

#app {
  /* font-family: "001Shirokuma", "Avenir", Helvetica, Arial, sans-serif; */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
/* 
input, select {
  font-family: "001Shirokuma";

} */

h1 {
  margin: 0px;
  font-size: 16pt;
}
h2 {
  margin: 0px;
  font-size: 14pt;
}

</style>
