<template>
  <h3>お試し運用中</h3>
  <span v-show="true">
    <p class="question">{{q1[qIndex].theme}}</p>
    <p class="question qes">{{q1[qIndex].question}}</p>
    <div class="answer-box">
      <div v-for="(answer,index) in q1[qIndex].answers"
        :key="index">
        <input :id="index" type="radio" name="answer" :value="index" v-model="myAnswer">
        <label :for="index">{{ answer }}</label>
      </div>
    </div>
    <!-- <p>{{ myAnswer }} : {{ q1[qIndex].trueAnswer - 1 }}</p> -->
  </span>

</template>

<script>
export default {
  data: function() {
    return {
      q1: require(`@/assets/data/chinese1013.json`),
      myAnswer : '',
      judge : 'たたかいのはじまり',
      qIndex: 0
    }
  },
  emits: ["updateAnswer"],
  mounted: function() {
    this.qIndex = Math.floor(Math.random() * (this.size(this.q1)));
  },
  methods: {
    judge_answer: function() {
      this.judge = this.q1[this.qIndex].trueAnswer - 1 == this.myAnswer ? true : false;
      if (this.judge) {
        this.myAnswer = '';
        this.qIndex = Math.floor(Math.random() * (this.size(this.q1)));
      }
      this.$emit("updateAnswer", this.judge);
      // this.myAnswer = ''
    },
    size(obj) {
      return Object.keys(obj).length;
    }

  },

}
</script>

<style scoped>

.question {
  text-align: left;
  margin: 5px;
}

.qes {
  font-size: 16pt;
  font-weight: bold;
}

.answer-box {
  background: lightblue;
  display: flex;
}

</style>