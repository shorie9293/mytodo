<template>
<div class="readme">
<h2>マグロクエスト 1.1.1</h2>
<a href="https://scrapbox.io/maguro-quest/マグロクエスト仕様">マグロクエスト仕様書</a>
<dl>
  <dt>機能</dt>
  <dd>todoをこなすと主人公のレベルがアップして強いモンスターが倒せるようになります。</dd>  
  <dd>バトルフィールドでは簡単な問題を問いて、正解するとモンスターに攻撃できます。</dd>
</dl> 
<h2>改訂履歴</h2>  
<table>
<tr>
  <td>'21/05/25</td>
  <td>ver 0.9.0</td>
  <td>
    <ul>
      <li>TodoのデータベースをlocalStrage=>IndexedDBに変更</li>
      <li>フローティングボタンによるTodoの追加機能。</li>
      <li>完了タスクの閲覧を可能に。</li>
      <li>繰り返しタスクの週・月の入力可能に</li>
    </ul>
  </td>     
</tr>
<tr>
  <td>'21/05/28</td>
  <td>ver 1.0 (祝!!)</td>
  <td>
    <ul>
      <li>繰り返しタスクを登録しておくと自動で今日のタスクに移動してくれる。</li>
    </ul>
  </td>     
</tr>
<tr>
  <td>'21/06/19</td>
  <td>ver 1.1</td>
  <td>
    <ul>
      <li>休日にかぶった日付繰り返しタスクを再登録する。</li>
      <li>問題画面のレイアウト変更</li>
      <li>今やるタスクに削除ボタン追加</li>
    </ul>
  </td>     
</tr>
<tr>
  <td>'21/07/06</td>
  <td>ver 1.1.1</td>
  <td>
    <ul>
      <li>プレーヤーの画像変更</li>
      <li>しょくぎょうを後から変えられるようにした</li>
    </ul>
  </td>     
</tr>
<tr>
  <td>'21/07/07</td>
  <td>ver 1.1.2</td>
  <td>
    <ul>
      <li>ステージ:絶望の塔追加</li>
    </ul>
  </td>     
</tr>
<tr>
  <td>'21/10/23</td>
  <td>ver 1.1.3</td>
  <td>
    <ul>
      <li>ステージ:天地の塔追加</li>
      <li>バグ修正</li>
    </ul>
  </td>     
</tr>
</table>
<a href="https://scrapbox.io/maguro-quest/%E6%94%B9%E8%A8%82%E5%B1%A5%E6%AD%B4">過去の改訂履歴</a>

<p>
  実装してほしい要望があれば <br> <a href="https://twitter.com/sholliencohol">@sholliencohol (twitter)</a> までご連絡を！
</p>
</div>

</template>

<style scoped>
  .readme {
    text-align: left;
  }
</style>