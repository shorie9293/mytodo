<!-- TODOを表示するパネル
TODOの機能はこのコンポーネントで完結できるようにする。 -->
<template>
  <div class="component">
    <div v-for="(todo, index) in todos" :key="todo.id">
      <input :id="todo.id" type="checkbox" v-model="todo.checked">
      <label :for="todo.id" ><span :class="{ finished : todo.checked }">{{ todo.value }}</span>: {{ todo.exp }}</label><span @click="deleteItem(index)"> [x]</span>
    </div>
  </div>
  <dl>
  <dt>タイトル<span v-show="isInputTitle" class="inputError"> あたいをいれてね</span></dt>
  <dd><input type="text" v-model="todo_title"/></dd>
  <dt>けいけんち<span v-show="isInputExp" class="inputError"> あたいをいれてね</span></dt>
  <dd><input type="Number" v-model="todo_exp"/></dd>
  </dl>
  <Button @click="addTodo" title="くわえる"/>
  <Button @click="enhanceExp" title="けいけんちアップ"/>
  <Button @click="deleteCheckedItem" title="かんりょうずみをけす"/>
</template>

<script>
import Button from '../atoms/Button';
export default {
  name: "todo-panel",
  components: {
    Button
  },
  props: {
    class: String
  },
  data() {
    return {
      leveldata: [],
      todos: [],
      todo_title: '',
      todo_exp: '',
      id_number: 0,
      isInputTitle: false,
      isInputExp: false,
    }
  },
  mounted: function() {
    // todoリストとtodoのID、経験値UPのためにレベルデータを読み出し
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.id_number = JSON.parse(localStorage.getItem('todoid')) || 0;
    this.leveldata = JSON.parse(localStorage.getItem('leveldata')) || 0;
  },
  watch: {
    // todoリストが変更されたらlocalStorageを変更する
    // handlerとdeepオプションをつけることで、todoオブジェクトの中身も管理する
    todos: {
      handler: function() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        localStorage.setItem('todoid', JSON.stringify(this.id_number));
      },
      deep: true
    }
  },
  methods: {
    // todoを加える
    addTodo: function() {
      // !!task!! ここにあとから全部入ってないと入力できないようにする
      this.isInputTitle = false;
      this.isInputExp = false;
      
      if (this.todo_title == '') {
        this.isInputTitle = true;
      }

      if (this.todo_exp == '') {
        this.isInputExp = true;
      }

      if (this.isInputTitle || this.isInputExp) {
        return;
      }

      this.todos.push({id: this.id_number, value: this.todo_title, exp: this.todo_exp, checked: false});
      this.id_number++;
      this.todo_title = '';
      this.todo_exp = '';
    },
    // [x]ボタンを押すとtodoを消す
    deleteItem: function(index) {
      if (!confirm('けしますか？')) {
        return;
      }
      this.todos.splice(index, 1);
      this.todo_title = '';
    },
    // checkされたアイテムを消す。
    // computedに定義されたremainingをtodoに代入している。
    deleteCheckedItem: function() {
      this.todos = this.remaining;
    },
    // かんりょうずみタスクの経験値を反映。
    // computedのcalExpを使っている。
    enhanceExp: function() {
      if (!confirm('けいけんちをはんえいしますか？')) {
        return;
      }
      this.leveldata.exp += this.calExp
      new Audio(require("/public/media/powerup10.mp3")).play();

      localStorage.setItem('leveldata', JSON.stringify(this.leveldata))
    }
  },
  computed: {
    // 完了していないタスクのみを抽出した配列を返す
    remaining: function() {
      if (!confirm('完了タスクをけしますか？')) {
        return;
      }
      return this.todos.filter(function(todo){
        return !todo.checked;
      })
    },
    // 完了済みタスクの経験値を合計して返す。
    calExp: function() {
      var totalExp = 0
      this.todos.forEach(function(todo){
        if (todo.checked) {
          totalExp += Number(todo.exp);
          todo.exp = 0;
        }
      })
      return totalExp;
    }
    
  },
}
</script>

<style scoped>
.component {
  text-align: left;
}

.inputError {
  color: red;
  font-size: 50%;
}

.finished {
  color:lightseagreen;
  font-style: italic;
  font-family: 'Times New Roman', 'ＭＳ Ｐゴシック', serif;
  font-weight: bold;
  letter-spacing: 0.2em;
}
</style>