<!-- TODOを表示するパネル
TODOの機能はこのコンポーネントで完結できるようにする。 -->
<template>
  <div class="component">
    <div v-for="(todo, index) in todos" :key="todo.id">
      <input :id="todo.id" type="checkbox" v-model="todo.checked">
      <!-- <label :for="todo.id" ><span :class="{ finished : todo.checked }">{{ todo.value }}</span>: {{ todo.exp }}</label><span @click="deleteItem(index)"> [x]</span> -->
      <TodoPanel :forid="todo.id"
       :value="todo.value"
       :exp="Number(todo.exp)"
       :initialExp="Number(todo.initialExp)"
       :classofvalue="{'finished' : todo.checked}"
       />
       <span @click="deleteItem(index)"> [x]</span>
       <!-- ラジオボタンで選択。'pick'にindexを格納している。 -->
       <input :id="todo.id"  type="radio" name="todoitems" v-model="pick" :value="index">
    </div>
  </div>
  <dl>
  <dt>タイトル<span v-show="isInputTitle" class="inputError"> あたいをいれてね</span></dt>
  <dd><input type="text" v-model="todo_title"/></dd>
  <dt>けいけんち<span v-show="isInputExp" class="inputError"> あたいをいれてね</span></dt>
  <dd><input type="number" min=0 max=5 v-model="todo_exp"/></dd>
  </dl>
  <Button @click="addTodo" title="くわえる"/>
  <Button @click="changeTodo(pick)" title="へんこうする"/>
  <Button @click="enhanceExp" title="けいけんちアップ"/>
  <Button @click="deleteCheckedItem" title="かんりょうずみをけす"/>
  <Button @click="hoimi" title="けいけんちかいふく"/>

</template>

<script>
import Button from '../atoms/Button';
import TodoPanel from '../molecules/TodoPanel.vue';

export default {
  name: "todo-panel",
  components: {
    Button,
    TodoPanel
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
      pick: 'none'
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

      if (this.checkInput()) {
        return;
      }

      this.todos.push({id: this.id_number,
       value: this.todo_title,
       exp: this.todo_exp,
       initialExp: this.todo_exp,
       checked: false});
      this.id_number++;
      this.todo_title = '';
      this.todo_exp = '';
    },
    changeTodo(pick) {
      
      if (pick == 'none') {
        return;
      }

      if (this.checkInput()) {
        return;
      }

      if(!confirm`タスクをへんこうしますか？`) {
        return;
      }
      this.todos[pick].value = this.todo_title,
      this.todos[pick].exp = this.todo_exp,
      this.todos[pick].initialExp = this.todo_exp
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
     if (!confirm('完了タスクをけしますか？')) {
        return;
      }
       this.todos = this.remaining;
    },
    // かんりょうずみタスクの経験値を反映。
    // computedのcalExpを使っている。
    enhanceExp: function() {
      if (!confirm('けいけんちをはんえいしますか？')) {
        return;
      }
      this.leveldata.exp += this.calExp
      new Audio(require(`@/assets/media/powerup10.mp3`)).play();

      localStorage.setItem('leveldata', JSON.stringify(this.leveldata))
    },
    // 経験値の回復。将来的には時間トリガーみたいな感じにしたい。
    hoimi: function() {
      if (!confirm('けいけんちをかいふくしますか？')) {
        return;
      }

      this.todos.forEach(todo=>{
        todo.exp = todo.initialExp
      })
    },
    // インプットに必要項目が入っているかをチェックする。
    checkInput: function() {
      this.isInputTitle = false;
      this.isInputExp = false;
      
      if (this.todo_title == '') {
        this.isInputTitle = true;
      }

      if (this.todo_exp == '') {
        this.isInputExp = true;
      }

      if (this.isInputTitle || this.isInputExp) {
        return true;
      }

    }
  },
  computed: {
    // 完了していないタスクのみを抽出した配列を返す
    remaining: function() {
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
    },
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

</style>