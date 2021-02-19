<template>
<div>
  <table class="level">

    <tr class="lvdata">
      <td class="lvdata-items">レベル</td>
      <td class="lvdata-detail">{{ status.level }}</td>
    </tr>

    <tr class="lvdata">
      <td class="lvdata-items">けいけんち</td>
      <td class="lvdata-detail">{{ status.exp }}</td>
    </tr>

    <tr>
      <td class="lvdata-items">aスキルポイント</td>
      <td class="lvdata-detail">{{ status.point }}</td>
    </tr>

  </table>

  <div class="container">
    <div @click="countUP(0)" class="box box1">
      <table class="status">
        <tr class="stdata">
          <td class="stdata-items">HP</td>
          <td class="stdata-detail">{{ counter[0] }}</td>
        </tr>
        <tr class="stdata">
          <td class="stdata-items">ポイント</td>
          <td class="stdata-detail">{{ lvup[0] }}</td>
        </tr>
      </table>
    </div>
    <div @click="countUP(1)" class="box box2">
      <table class="status">
        <tr class="stdata">
          <td class="stdata-items">こうげき</td>
          <td class="stdata-detail">{{ counter[1] }}</td>
        </tr>
        <tr class="stdata">
          <td class="stdata-items">ポイント</td>
          <td class="stdata-detail">{{ lvup[1] }}</td>
        </tr>
      </table>
    </div>
    <div @click="countUP(2)" class="box box3">
      <table class="status">
        <tr class="stdata">
          <td class="stdata-items">ぼうぎょ</td>
          <td class="stdata-detail">{{ counter[2] }}</td>
        </tr>
        <tr class="stdata">
          <td class="stdata-items">ポイント</td>
          <td class="stdata-detail">{{ lvup[2] }}</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="btns">
    <div @click="ref_status" class="bt bt-submit">
      けってい
    </div>
    <div @click="reset" class="bt bt-cancel">
      キャンセル
    </div>
    <div @click="addExp" class="bt bt-addexp">
      けいけんちアップ
    </div>
    <div>
      <a href="/subpage/battle.html">たたかい</a>
    </div>
  </div>
  <h3>For Debug</h3>
  <div @click="clear" class="btns bt bt-addexp">
    クリア
  </div>
  <div>
    <input type="number" v-model="status.todoexp">
  </div>
    
</div>

  
</template>

<script>
export default {
  name: "MainMenu",
  data: function () {
    return {
      status: {
        level:1,
        exp:0,
        point:0
      },
      counter: [],
      lvup: [0, 0, 0]
    }
  },
    //save localstrage
  watch: {
    // counter: function() {
    //     localStorage.setItem('counter', JSON.stringify(this.counter));
    //     alert('Data saved!');
    // }
    counter: {
      handler: function() {
        localStorage.setItem('counter', JSON.stringify(this.counter)); 
        localStorage.setItem('status', JSON.stringify(this.status)); 
      },
      deep: true
    },
    'status.exp': function(value) {
      let upexp = 30;
      let a_lvup = new Audio("/public/mp3/crrect_answer3.mp3");
      if (value >= upexp) {
        this.status.level++
        a_lvup.play();
        this.status.point += 10
        this.status.exp -= upexp;
        localStorage.setItem('status', JSON.stringify(this.status)); 
      }  
    }
  }, 
  mounted: function() {
    this.counter = JSON.parse(localStorage.getItem('counter'))  || [0, 0, 0];
    this.status = JSON.parse(localStorage.getItem('status'))  || {level: 1, exp: 0, point: 10, todoexp: 0};
    //JSONのparseがうまく行かなかった場合、空配列を入れる。
  },
  methods: {
    countUP: function(id) {
      let a_cup = new Audio("/public/mp3/button01a.mp3");
      if (this.status.point > 0) {
        a_cup.play();
        // var value = this.lvup[id];
        this.lvup[id] += 1;
        this.status.point -= 1;
      }
    },
    reset: function() {
      this.status.point += this.lvup[0] + this.lvup[1] + this.lvup[2]
      this.lvup = [0, 0, 0]
    },
    ref_status: function() {
      if (this.lvup[0] + this.lvup[1] + this.lvup[2] == 0) {
        return;
      }
      for (var i=0; i<3; i++) {
        if (this.lvup[i] > 0) {
          this.counter[i] += this.lvup[i]
        }
      }
      let a_pup = new Audio("/public/mp3/powerup05.mp3");
      a_pup.play();
      this.lvup = [0, 0, 0]
    },
    addExp: function() {
      if (this.status.todoexp <= 0) {
        return;
      }
      let a_eup = new Audio('/public/mp3/powerup10.mp3');
      // let a_eup = new Audio('../powerup10.mp3');
      this.status.exp += Number(this.status.todoexp);
      a_eup.play();
      this.status.todoexp = 0;
    },
    clear: function() {
      localStorage.setItem('counter', JSON.stringify([0,0,0])); 
      localStorage.setItem('status', JSON.stringify({level: 1, exp: 0, point: 10, todoexp: 0})); 
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 10px;
}

.box {
  width: 150px;
  height: auto;
  margin-right: 5px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  cursor: pointer;
  user-select: none;
}

.box1 {
  background-color: orange;
}

.box2 {
  background-color: lightblue;
}

.box3 {
  background-color: lightgreen;
}

.btns {
  text-align: center;
  display: flex;
  flex-flow: column;
  color: white;
  cursor: pointer;
  user-select: none;
  display: table-cell;
  width: 460px;
}

.bt {
  height: auto;
  margin-top: 10px;
  background-color: gray;
}


.level {
  border-collapse: collapse;
}

.lvdata-items::after{
  content: " : ";
}

.lvdata-detail, .lvdata-items {
  border-bottom: 1px solid;
}

.lvdata-detail {
  text-align: right;
  width: auto;
}

.status {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}

.stdata-items::after{
  content: " : ";
}
.stdata-items {
  text-align: left;
  width: 70%;
}

.stdata-detail {
  text-align: right;
}


dt {
  float: left;
}

dt::after {
  content: " : ";
}

</style>