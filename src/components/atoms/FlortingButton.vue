<template>
  <div class="fab-component ripple">
    <div class="fab-text"><fa icon="plus" type="fas" class="fas fa-plus"></fa></div>
    <!-- <fa icon="check" type="fas" class="fas fa-tasks fab-component"></fa> -->
  </div>
</template>

<style scoped>
.fab-component {
  position: absolute;
  display: table-cell;
  bottom: 10px;
  right: 10px;
  box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1);
  background: hsl(180, 80%, 50%);
  border-radius: 50%;
  height: 50px;
  width: 50px;
  user-select: none;
  text-align: center;
  vertical-align: middle;
  z-index: 10000;
}

.fab-text{
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  vertical-align: middle;
  width: 30px;
}

.ripple {
    /* 放射グラデーションイメージの位置を中央に設定 */
  background-position: center;
  /* background属性にアニメーションを0.4秒で設定 */
  transition: background 0.6s;
}

.ripple:hover {
  background-size: 15000%;
}

.ripple:active {
  /* 放射グラデーションイメージのサイズを元のサイズに戻すように設定 */
  background-size: 100%;
  /* ここではアニメーションを無効にするように設定 */
  transition: background 0s;
}

.fab-component.ripple:hover {
  /* 1%の大きさで作成された放射グラデーションイメージを背景画像に設定 */
  /* background-image: radial-gradient(circle, transparent 1%, #7e57c2 1%); */
  /* ホバーしたときの背景色を設定 */
  background: hsl(180, 80%, 40%);
}


.fab-component.ripple:active {
    /* クリックまたはタップされている間の背景色を設定 */
    background-color:hsl(180, 80%, 70%);
}

</style>