import TodoDBAdapter from '@/assets/js/TodoDBAdapter'

let db = TodoDBAdapter;
let date = new Date;
let todos = [];

db.createDB();

async function getToday() {
  todos = await db.searchTitle(23);
  todos.forEach( todo => {
      console.log(todo.title);
      if (todo.title == date.getDate()) console.log(`This is todays task: ${todo.index}`);
    }
  )
}

export default {
  getToday,

}