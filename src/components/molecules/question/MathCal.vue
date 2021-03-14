<!-- 算数の問題を出すパーツ  -->
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

</template>

<script>

export default {
name: "MathCal",
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
      judge: 'たたかいのはじまり'
    }
  },
  mounted: 
  // マウントするたびに問題を更新する
    function() {this.nextQuestion();}
  ,
  emits: ["updateAnswer"],
  methods: {
    //問題更新
    nextQuestion: function() {
      //足し算、引き算、掛け算を割り振る
      this.index = Math.floor(Math.random() * 3);

      //足し算は二桁、掛け算は一桁、引き算は正の整数になるようにしている
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
    // こたえがあっているかどうか確認する
    judge_answer: function() {
      this.judge = this.answer == this.myAnswer ? true : false;
      if (this.judge) {
        this.nextQuestion();
      }
      this.$emit("updateAnswer", this.judge);
      this.myAnswer = ''
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
</style>