<template>

  <div v-show="true">
    <p class="question"><span v-html="question[qIndex].theme" ></span></p>
    <p class="question qes">{{question[qIndex].question}}</p>
    <div class="answer-box">
      <div v-for="(answer,index) in question[qIndex].answers"
        :key="index">
        <input :id="index" type="radio" name="answer" :value="index" v-model="myAnswer">
        <label :for="index">{{ answer }}</label>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    question: Object 
  },
  emits: ["updateAnswer"],
  data: function() {
    return {
      myAnswer : '',
      // judge : 'たたかいのはじまり',
      qIndex: 0
    }
  },
  mounted: function() {
    this.qIndex = Math.floor(Math.random() * (this.size));
  },
  methods: {
    judge_answer: function() {
      this.judge = this.question[this.qIndex].trueAnswer - 1 == this.myAnswer ? true : false;
      this.$emit("updateAnswer", this.judge);

      if (this.judge) {
        this.myAnswer = '';
        this.qIndex = Math.floor(Math.random() * (this.size));
      }

    },
    // size(obj) {
    //   return Object.keys(obj).length;
    // }

  },
  computed: {
    size() {
      return Object.keys(this.question).length
    },
    judge() {
      return this.question[this.qIndex].trueAnswer - 1 == this.myAnswer ? true : false;
    }

  }

}
</script>

<style scoped>

.question, .answer-box {
  font-family: 'Segoe UI',SegoeUI,'Microsoft YaHei',微软雅黑,"Helvetica Neue", Helvetica,Arial,sans-serif;
}

.question {
  text-align: left;
  margin: 5px;
}

.qes {
  font-weight: bold;
}

.answer-box {
  background: lightblue;
  text-align: left;
}

</style>