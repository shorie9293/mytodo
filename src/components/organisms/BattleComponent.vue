<template>
  <div class="mst-box">
    <transition name="mst">
      <MonsterView :imgs="img" :class="{shake : isShake, attack : isAttack}" v-show="show" />
    </transition>
  </div>
  <MathCal @updateAnswer="judgeAnswer"/>
  <BattleStatusData class="hp-box" :myHp="status.myStatus.hp" :enHp="status.enemyStatus.hp"/>
  <div v-if="winner == 0" class="state wait">たいせん中</div>
  <div v-else-if="winner == 1" class="state win">あなたのかち!!</div>
  <div v-else-if="winner == 2" class="state lose">あなたのまけ...</div>
  <div v-else>Error</div>
  <Button title="さいせん" @click="reset"/>
  <div style="width: 100px;">
      勝利数: {{defetCounter}}
      <Button title="reset" @click="resetCounter"/>
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
import Button from '../atoms/Button'
import MonsterView from '../atoms/MonsterView'
import BattleStatusData from '../molecules/BattleStatusData'
import MathCal from '../molecules/MathCal'

export default {
  name: "BattleComponent",
  components: {
    MonsterView,
    BattleStatusData,
    Button,
    MathCal
  },
  props: {
    class: String
  },
  data: function() {
    return {
      img: require('/public/imgs/bone_ape.png'),
      show: true,
      isShake: false,
      isAttack: false,
      winner: 0,
      anser: '',
      judge: false,
      status: {
        myStatus :{
          hp: 0,
          attack: 0,
          diffence: 0
      },
      enemyStatus: {
          hp: 10,
          attack: 3,
          diffence: 2
        }
      },
      sts: [
        {itm: "HP", vl: 0, pt: 0, cl:"box1"},
        {itm: "AT", vl: 0, pt: 0, cl:"box2"},
        {itm: "DF", vl: 0, pt: 0, cl:"box3"}
      ],
      defetCounter: 0

    }
  },
  watch: {
    winner: function() {
      localStorage.setItem('defetCounter', JSON.stringify(this.defetCounter))
    }
  },
  mounted: 
    function() {
    this.sts = JSON.parse(localStorage.getItem('status'))
    this.defetCounter = JSON.parse(localStorage.getItem('defetCounter'))
    this.status.myStatus.hp = this.sts[0].vl
    this.status.myStatus.attack = this.sts[1].vl
    this.status.myStatus.diffence = this.sts[2].vl
    }
  ,
  methods: {
    damage: function() {
      
      var mysts = this.status.myStatus
      var ensts = this.status.enemyStatus

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

      function atkToEnemy(v) {
        if (dam > 0) {
          new Audio(require('/public/mp3/straight_punch.mp3')).play()
          // a_atk.play()
          v.isShake = true;
        }
        ensts.hp -= dam > 0 ? dam : 0;  
        if (ensts.hp <= 0) {
          v.show = false;
          v.winner = 1;
          v.defetCounter++;
          new Audio(require('/public/mp3/chorus_of_angels1.mp3')).play()
          return
        } else {
          setTimeout(function(){ 
            v.isShake = false;
            let dam2 = ensts.attack - mysts.diffence
            mysts.hp -= dam2 > 0 ? dam2 : 0;
            atkFromEnemy(v); }, 820)
        }
        return;

        function atkFromEnemy(v) {
          new Audio(require('/public/mp3/kick2.mp3')).play()
          v.isAttack = true;
          if (mysts.hp <= 0) {
            v.winner = 2;
            new Audio(require('/public/mp3/surprising_shock2.mp3')).play()
            return;
          } else {
            setTimeout(function(){ v.isAttack = false }, 820)
            return;
          }
        }
      }

    },
    reset: function() {
      this.show = true;
      this.isShake = false;
      this.isAttack = false;
      this.winner = 0;
      this.status.myStatus.hp = this.sts[0].vl
      this.status.myStatus.attack = this.sts[1].vl
      this.status.myStatus.diffence = this.sts[2].vl
      this.status.enemyStatus.hp = 10
    },
    judgeAnswer: function(value) {
      this.judge = value;
      this.damage();
    },
    resetCounter: function() {
      this.defetCounter = 0;
      localStorage.setItem('defetCounter', JSON.stringify(this.defetCounter))
    }
  }
  
}
</script>

<style scoped>

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

.state {
  font-size: 20pt;
  font-weight: bolder;
}

.win {
  color: blue;
}

.lose {
  color: red;
}
</style>