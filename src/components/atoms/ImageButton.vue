<!-- //ボタンの再定義 -->
<template>
  <div class="bt ripple">
    <img :src="src" :alt="alt" class="image">  
  </div>
</template>

<script>
export default {
  name: "ImageButton",
  props: {
    src: String,
    alt: String,
  },  
}
</script>

<style scoped>
  .image {
    width: 60px;
    margin-right: auto;
    margin-left: auto;
  }

  .bt {
    width: auto;
    margin: 1px 1px;
    color: white;
    padding: 3px;
    border-radius: px;
    /* box-shadow: 0.1px 2px rgba(0, 0, 0, 0.1); */
    transition: background 0.3s;
    cursor: pointer;
    user-select: none;
    margin-right: auto;
    margin-left: auto;
    background: rgba(200, 255, 200, 0.5);
    border: 3px solid rgb(100, 200, 100,0.5);
  }

  .bt:hover {
    background: hsl(0, 0%, 60%);
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
  
  .bt.ripple:hover {
    /* 1%の大きさで作成された放射グラデーションイメージを背景画像に設定 */
    background-image: radial-gradient(circle, transparent 1%, #7e57c2 1%);
    /* ホバーしたときの背景色を設定 */
    background: rgba(200, 255, 200, 0.5);
  }


  .bt.ripple:active {
      /* クリックまたはタップされている間の背景色を設定 */
      background-color: hsl(0, 0%, 70%);
  }


</style>
