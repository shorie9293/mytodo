<template>
  <span v-show="true">
    <p class="question"><span v-html="question[qIndex].theme" ></span></p>
    <p class="question qes">{{question[qIndex].question}}</p>
    <div class="answer-box">
      <div v-for="(answer,index) in question[qIndex].answers"
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
  props: {
    question: Object 
  },
  data: function() {
    return {
      // question: require(`@/assets/data/chinese1013.json`),
      myAnswer : '',
      judge : 'たたかいのはじまり',
      qIndex: 0
    }
  },
  emits: ["updateAnswer"],
  mounted: function() {
    this.qIndex = Math.floor(Math.random() * (this.size(this.question)));
  },
  methods: {
    judge_answer: function() {
      this.judge = this.question[this.qIndex].trueAnswer - 1 == this.myAnswer ? true : false;
      if (this.judge) {
        this.myAnswer = '';
        this.qIndex = Math.floor(Math.random() * (this.size(this.question)));
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

.question, .answer-box {
  font-family: 'Segoe UI',SegoeUI,'Microsoft YaHei',微软雅黑,"Helvetica Neue", Helvetica,Arial,sans-serif;
}

.question {
  text-align: left;
  margin: 5px;
}

.qes {
  /* font-size: 16pt; */
  font-weight: bold;
}

.answer-box {
  background: lightblue;
  text-align: left;
}

</style>