<!-- 戦闘画面 -->
<template>
  <div class="mst-box">
    <transition name="mst">
      <MonsterView :imgs="status.enemyStatus.img" :class="{shake : isShake, attack : isAttack}" v-show="show" v-if="status.enemyStatus.name!=''"/>
    </transition>
  </div>
    <div v-if="status.enemyStatus.name!=''">
      {{status.enemyStatus.name}}があらわれた
    </div>

  <BattleStatusData class="hp-box" 
    :myHp="status.myStatus.hp" 
    :enHp="status.enemyStatus.hp"
    :money="leveldata.money"
    />
  <!-- あたりとはずれの表示をする。一回目だけたたかいの始まりを表示する -->
  <div v-if="winner == 0" class="state wait">たいせん中</div>
  <div v-else-if="winner == 1" class="state win">あなたのかち!!</div>
  <div v-else-if="winner == 2" class="state lose">あなたのまけ...</div>
  <div v-else>Error</div>

  <div class="answer" :class="{'ok' : judge, 'ng' : !(judge)}">
    <div v-if="judge=='たたかいのはじまり'">
      {{ judge }}
    </div>
    <div v-else>
      {{judge ? "あたり！" : "はずれ…"}}
    </div>
  </div>

  <div class="select-question">
    <select name="question" id="q" v-model="pickQuestion">
      <option v-for="(question, index) in questionType"
        name="question"
        :key="index"
        :value="question">{{ question }}</option>
        <!-- <input type="radio" :id="index" name="question" :value="question" v-model="pickQuestion">
        <label :for="index">{{ question }}{{ pickQuestion }}</label> -->
      <!-- </div> -->
    </select>
  </div>
  <span v-if="pickQuestion == 'さんすう'">
    <MathCal ref="math" @updateAnswer="judgeAnswer"/>
    <standard-button title="こうげき" @click="$refs.math.judge_answer()"/>
  </span>
  <span v-else-if="pickQuestion == 'たんご'">
    <word-q ref="word" :question="require(`@/assets/data/chinese1013.json`)" @updateAnswer="judgeAnswer"/>
    <standard-button title="こうげき" @click="$refs.word.judge_answer()"/>
  </span>
  <span v-else-if="pickQuestion == 'カスタム'">
    <word-q ref="word" :question="customQ[1]" @updateAnswer="judgeAnswer"/>
    <standard-button title="こうげき" @click="$refs.word.judge_answer()"/>
  </span>
  <!-- 対戦状態を表記する -->
  <div class="enemy-select">
    <standard-button title="てきをせんたくする" @click="reset" class="select-btn"/>
    <select name="monster" id="monst" @change="onChange">
      <option v-for="(m,index) in enemyDatabase" 
          :key="index"
          :value="m.name"> {{ m.name }}
      </option>
    </select>
  </div>
  <div style="width: 100px;">
      勝利数: {{defetCounter}}
      <standard-button title="reset" @click="resetCounter"/>
  </div>

  <div v-show=false>
    <div>
      <input type="number" v-model="status.enemyStatus.hp">
    </div>
    <div>
      <input type="number" v-model="status.enemyStatus.attack">
    </div>
    <div>
      <input type="number" v-model="status.enemyStatus.diffence">
    </div>
  </div>
</template>

<script>
import StandardButton from '../atoms/Button'
import MonsterView from '../atoms/MonsterView'
import BattleStatusData from '../molecules/BattleStatusData'
import MathCal from '../molecules/question/MathCal'
import WordQ from '../molecules/question/WordQ.vue'

export default {
  name: "BattleComponent",
  components: {
    MonsterView,
    BattleStatusData,
    StandardButton,
    MathCal,
    WordQ
  },
  props: {
    class: String
  },
  data: function() {
    return {
      imgobj: '',
      img: '',
      datafile: require(`@/assets/data/monster.json`),
      show: true,
      isShake: false,
      isAttack: false,
      winner: 0,
      anser: '',
      judge: 'たたかいのはじまり',
      enemyDatabase: [],
      status: {
        myStatus :{
          hp: 0,
          attack: 0,
          diffence: 0
        },
        enemyStatus: {
          name: '',
          img: '',
          hp: 0,
          attack: 0,
          diffence: 0,
          money: 0,
        }
      },
      sts: [
        {itm: "HP", vl: 0, pt: 0, cl:"box1"},
        {itm: "AT", vl: 0, pt: 0, cl:"box2"},
        {itm: "DF", vl: 0, pt: 0, cl:"box3"}
      ],
      leveldata: {        
        lv: 1,
        exp: 0,
        pt: 0,
        stexp: 0,
        money: 0
      },
      questionType: {
        math: "さんすう",
        word: "たんご",
        custom: "カスタム"
      },
      defetCounter: 0,
      isEnemyData: false,
      stageNum: '',
      index: '',
      pickQuestion: 'さんすう',
      customQ: []
    }
  },
  watch: {
    // 勝った回数を記録する。今の所使用予定はない。
    'winner': function() {
      localStorage.setItem('defetCounter', JSON.stringify(this.defetCounter))
    }
  },
  mounted :  
    function() {
      // 自分のステータスを読み込む。
      this.sts = JSON.parse(localStorage.getItem('status'))
      this.defetCounter = JSON.parse(localStorage.getItem('defetCounter'))
      this.stageNum = JSON.parse(localStorage.getItem('stageNumber')) || 0
      this.leveldata = JSON.parse(localStorage.getItem('leveldata'))
      this.pickQuestion = JSON.parse(localStorage.getItem('initq')) || "さんすう"
      this.status.myStatus.hp = this.sts[0].vl
      this.status.myStatus.attack = this.sts[1].vl
      this.status.myStatus.diffence = this.sts[2].vl
      this.enemyDatabase = this.datafile
      this.customQ = JSON.parse(localStorage.getItem('customQuestion')) || [{"title":""},
  [{"theme": "", "question": "", "answers": ["", "", "", ""], "trueAnswer": "", "comment": ""}]
]
    },
  methods: {
    // 一連の攻撃画面。アニメーションを表記するためにsetTimeoutを入れ子にしているのと、内部関数使ってる
    // 再帰とか使えばもっとうまくかけそうな気がするが…
    damage: function() {
      
      var mysts = this.status.myStatus
      var ensts = this.status.enemyStatus
      if (this.status.enemyStatus.name=='') {
        alert('てきをせんたくしてください')
        return;
      }
      if (this.winner != 0) {
        return;
      }
      let dam
      if (!this.judge) {
        dam = 0;
      } else {
        dam = mysts.attack - ensts.diffence;
      }
      atkToEnemy(this)
      // 敵への攻撃
      function atkToEnemy(v) {
        if (dam > 0) {
          new Audio(require(`@/assets/media/straight_punch.mp3`)).play()
          v.isShake = true;
        }
        ensts.hp -= dam > 0 ? dam : 0;
        // 勝利！！  
        if (ensts.hp <= 0) {
          v.show = false;
          v.winner = 1;
          v.defetCounter++;
          if (!v.leveldata.money) {
            v.leveldata.money = v.status.enemyStatus.money; 
          } else {
            v.leveldata.money += v.status.enemyStatus.money; 
          }
          new Audio(require(`@/assets/media/chorus_of_angels1.mp3`)).play()
          localStorage.setItem('leveldata', JSON.stringify(v.leveldata))
          return
        } else {
          setTimeout(function(){ 
            v.isShake = false;
            let dam2 = ensts.attack - mysts.diffence
            mysts.hp -= dam2 > 0 ? dam2 : 0;
            atkFromEnemy(v); }, 820)
        }
        return;
        // 敵からの攻撃
        function atkFromEnemy(v) {
          new Audio(require(`@/assets/media/kick2.mp3`)).play()
          v.isAttack = true;
          // 敗北…
          if (mysts.hp <= 0) {
            v.winner = 2;
            new Audio(require(`@/assets/media/surprising_shock2.mp3`)).play()
            return;
          } else {
            setTimeout(function(){ v.isAttack = false }, 820)
            return;
          }
        }
      }

    },
    // 勝負状態をリセットして再戦する
    reset: function() {
      if (!confirm(this.enemyDatabase[this.stageNum].name + "とたたかいますか？")) {
        return;
      }

      if (this.winner == 0 && this.status.enemyStatus.name != '') {
        if (!confirm("たいせんとちゅうですがよいですか？")) return;
      }

      this.show = true;
      this.isShake = false;
      this.isAttack = false;
      this.winner = 0;
      this.index = this.stageNum;
      this.status.myStatus.hp = this.sts[0].vl
      this.status.myStatus.attack = this.sts[1].vl
      this.status.myStatus.diffence = this.sts[2].vl
      this.setStage()
    },
    // 別にjudgeしているわけではないが、将来的にここで判定したい
    judgeAnswer: function(value) {
      this.judge = value;
      this.damage();
    },
    // 対戦回数リセット
    resetCounter: function() {
      this.defetCounter = 0;
      localStorage.setItem('defetCounter', JSON.stringify(this.defetCounter))
    },
    setStage: function() {
      this.status.enemyStatus.img = require(`@/assets/imgs/${this.enemyDatabase[this.stageNum].img}`)
      this.status.enemyStatus.name = this.enemyDatabase[this.stageNum].name
      this.status.enemyStatus.hp = this.enemyDatabase[this.stageNum].hp
      this.status.enemyStatus.attack = this.enemyDatabase[this.stageNum].at
      this.status.enemyStatus.diffence = this.enemyDatabase[this.stageNum].df
      this.status.enemyStatus.money = this.enemyDatabase[this.stageNum].money
    },
    onChange: function(e) {
      this.stageNum = e.target.selectedIndex;
    }
  }
}
</script>

<style scoped>
/* アニメーション処理 */
/* 自分攻撃時。横揺れ */
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  background-color: orange;
  
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

/* 敵攻撃時。拡大縮小 */
.attack {
  background-color: tomato;
  animation: attack 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes attack {
  50%
  {
    transform: scale(1.1);
  }

  80%{
    transform: scale(0.8);
  }
}

.mst-box {
  display: flexbox;
  width: auto;
  height: 100px;
  margin-right: auto;
  margin-left: auto;
}

.hp-box {
  width: auto;
  height: auto;
  margin-right: auto;
  margin-left: auto;
}


.mst-enter-active,
.mst-leave-active {
  transition: opacity 0.5s ease;
}

.mst-enter-from,
.mst-leave-to,
.shake-enter-from,
.shake-leave-to {
  opacity: 0;
}

.state, .answer {
  font-size: 16pt;
  font-weight: bolder;
}

.win, .ok {
  color: blue;
}

.lose, .ng {
  color: red;
}

.select-question {
  text-align: left;
}

.enemy-select {
  display: flex;
}

.select-btn {
  width: 100%;
  align-content: left;
  margin-right: 5px;
}

</style>
