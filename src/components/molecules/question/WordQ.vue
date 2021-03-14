<template>
  <p>Coming Soon...</p>
  <span v-show="false">
    <p>{{q1[qIndex].question}}</p>
    <div v-for="(answer,index) in q1[qIndex].answers"
      :key="index">
      <input :id="index" type="radio" name="answer" :value="index" v-model="myAnswer">
      <label :for="index">{{ answer }}{{ index }}</label>
    </div>
    <p>{{ myAnswer }} : {{ q1[qIndex].trueAnswer }}</p>
  </span>

</template>

<script>
export default {
  data: function() {
    return {
      q1: [{ question: 'hoge?',
        answers: [
        "hoge",
        "hage",
        "hige",
        "hege"
       ],
       trueAnswer: 0
      },
      { question: 'hage?',
        answers: [
        "hoge",
        "hage",
        "hige",
        "hege"
       ],
       trueAnswer: 1
      }],
      myAnswer : '',
      judge : 'たたかいのはじまり',
      qIndex: 0
    }
  },
  emits: ["updateAnswer"],
  methods: {
    judge_answer: function() {
      this.judge = this.q1[this.qIndex].trueAnswer == this.myAnswer ? true : false;
      if (this.judge) {
        if (this.qIndex == 1) {
          this.qIndex = 0;

        } else {
          this.qIndex++;
        }
      }
      this.$emit("updateAnswer", this.judge);
      // this.myAnswer = ''
    }

  } 

}
</script>

<style scoped>

</style>