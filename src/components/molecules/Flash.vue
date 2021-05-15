<template>

  <transition name="fade">
    <div class="flash" v-if="show">
    {{ finish_word }}
    </div>
  </transition>

</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  data: function() {
    return {
      word: require(`@/assets/data/finish_word.json`),
      finish_word: "やったぜ！"
    }
  },
  watch: {
    'show': function() {
      this.finish_word = this.word[Math.floor(Math.random() * (this.word.length))];
    }
  }
}
</script>

<style scoped>

.flash {
  display: grid;
  place-items: center;
  text-align: center;
  position: absolute;
  font-size: 12pt;
  left: 50%; top: 50%;
  width:100px; height: 100px;
  border-radius: 50%;
  background: rgba(200, 255, 1, 0.8);
  z-index: 2147483647;
  animation: flash 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

}

@keyframes flash {

  0%
  {
    transform: scale(0);
  }

  60%
  {
    transform: scale(2);
  }
  
  100%
  {
    transform: scale(50);
  }

}
.fade-enter-from {
  /*開始の状態を指定する*/
  opacity: 0;
}
.fade-enter-to {
  /*終了の状態を指定する*/
  opacity: 1;
}
.fade-enter-active {
   /*動作（イージングや時間）を指定する*/
  transition: opacity 600ms ease-out;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 300ms ease-out;
}
.finish-button {
  position: absolute;
  bottom: 0pt;
  width: 100%;
}
</style>