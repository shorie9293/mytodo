<template>

  <transition name="fade">
    <div class="flash" v-if="show">
    やったぜ！
    </div>
  </transition>

</template>

<script>
export default {
  props: {
    show: Boolean,
  }
}
</script>

<style scoped>

.flash {
  display: grid;
  place-items: center;
  text-align: center;
  position: absolute;
  font-size: 48pt;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background: rgba(200, 255, 1, 0.8);
  z-index: 2147483647;
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
  transition: opacity 300ms ease-out;
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