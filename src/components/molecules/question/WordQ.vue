<template>

  <div v-show="true">
    <p class="question"><span v-html="question[qIndex].theme" ></span></p>
    <p class="question qes">{{question[qIndex].question}}</p>
    <div class="answer-box">
      <div v-for="(answer,index) in randomAnswer"
        :key="index">
        <input :id="index" type="radio" name="answer" :value="index" v-model="myAnswer">
        <label :for="index"> {{answer.key}} </label>
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
      this.$emit("updateAnswer", this.judge);

      if (this.judge) {
        this.myAnswer = '';
        this.qIndex = Math.floor(Math.random() * (this.size));
      }

    },

  },
  computed: {
    size() {
      return Object.keys(this.question).length
    },
    judge() {
      return this.randomAnswer[this.myAnswer].value;
    },
    // 選択肢をランダムで表記
    randomAnswer() {
      // 選択肢をKeyとValue(当たり判定)に分解
      var arr = Object.entries(this.question[this.qIndex].answers).map(([key, value]) => ({'key': key, 'value': value}));
      let num = arr.length;
      
      while (num) {
        let i = Math.floor(Math.random() * num);
        let obj = arr[--num];
        arr[num] = arr[i];
        arr[i] = obj;
      }

      return arr
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
  border-radius: 4px;
  box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);

}


</style>