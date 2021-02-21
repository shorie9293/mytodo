<template>
  <div class="component">
    <div class="txt">
      {{ value1 }}
    </div>
    <div class="txt">
      {{ symbol[index] }}
    </div>
    <div class="txt">
      {{ value2 }}
    </div>    
    <div class="txt">
      =
    </div>
    <input type="Number" v-model="myAnswer" class="ans">
  </div>
  <div class="answer" :class="{'ok' : judge, 'ng' : !(judge)}">{{judge ? "あたり！" : "はずれ…"}}</div>
  <Button title="こうげき" @click="judge_answer"/>
  <Button title="つぎのもんだい" @click="nextQuestion"/>
</template>

<script>
import Button from '../atoms/Button'

export default {
name: "MathCal",
  components: {
    Button
  },
  props: {
    },
  data: function(){
    return {
      symbol: ["+", "-", "x", "÷"],
      value1: 1,
      value2: 2,
      myAnswer: '',
      answer: 3,
      index: 0,
      judge: ''
    }
  },
  mounted: 
    function() {this.nextQuestion();}
  ,
  methods: {
    solution: function() {

    },
    nextQuestion: function() {
      this.index = Math.floor(Math.random() * 3);

      if (this.symbol[this.index] == "x") {
        this.value1 = Math.floor(Math.random() * 9) + 1;
        this.value2 = Math.floor(Math.random() * 9) + 1;
        this.answer = this.value1 * this.value2
      } else if (this.symbol[this.index] == "+") {
        this.value1 = Math.floor(Math.random() * 99) + 1;
        this.value2 = Math.floor(Math.random() * 99) + 1;
        this.answer = this.value1 + this.value2
      } else if (this.symbol[this.index] == "-") {
        this.value1 = Math.floor(Math.random() * 99) + 1;
        this.value2 = Math.floor(Math.random() * this.value1) + 1;
        this.answer = this.value1 - this.value2
      }
    },
    judge_answer: function() {
      this.judge = this.answer == this.myAnswer ? true : false;
      if (this.judge) {
        this.nextQuestion();
      }
      this.$emit("updateAnswer", this.judge);
    }
  }
}
</script>

<style scoped>
  .component {
    margin: auto;
    width: 90%;
    display: flex;
    height: auto;
  }
  .txt {
    margin: auto;
    font-size: 20pt;
    height: 100%;
    vertical-align: center;
    width: 100px;
    background-color: whitesmoke;
  }
  .ans {
    width: 3.5em;
    margin: auto;
    font-size: 20pt;
    height: 100%;
    text-align: right;
  }
  .answer {
    font-size: 30pt;
    font-weight: bolder;
  }

  .ok {
    color: blue;
  }

  .ng {
    color: red;
  }
</style>