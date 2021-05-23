import Dexie from 'dexie';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';

let db;

async function createDB() {
  db = new Dexie('maguroDB');
  db.version(2).stores({todo_table: '++index, id, project, title, type, checked, finish_date'});
  db.on("populate", function() {
    db.todo_table.bulkPut([
      {
        id: uuidv4(),
        project: 'main', 
        title: '最も目に入れておきたいタスクを入れます。例:仕事のことなど', 
        type: 'nexttask',
        exp: 5,
        exp_init: 5,
        checked: false,
        finish_date: '',
      },
      {
        id: uuidv4(),
        project: 'repeat', 
        title: '繰り返したいタスクを入れます。', 
        type: 'nexttask',
        exp: 3,
        exp_init: 3,
        checked: false,
        finish_date: '',
      },
      {
        id: uuidv4(),
        project: 'sub', 
        title: '通常のタスクを入れます。例:家でのことなど', 
        type: 'nexttask',
        exp: 1,
        exp_init: 1,
        checked: false,
        finish_date: '',
      }
    ]);
  })
  await db.open();
}

async function addTodo(todo) {
  await db.todo_table.put({
    id: todo.id, 
    project: todo.project,
    title: todo.title,
    type: todo.type, 
    exp: todo.exp,
    exp_init: todo.exp,
    checked: todo.checked,
    finish_date: ''});
}

// async function changeTodo(todo) {
//   console.log(db.todo_table.where({'id':todo.id}).toArray());
// }

async function changeChecked(todos) {

  let changed_todos = [];

  // forEachやfilterを使うとうまく行かない。
  // おそらく、内部でawait使う処理するとreturnのほうがあとに処理される。
  for (const todo of todos) {
    const oldtodo = await db.todo_table.get(todo.index);
    if (todo.checked !== oldtodo.checked) {
      changed_todos.push(todo);
    }
  }

  if (!changed_todos.length) {
    return;
  }

  changed_todos.forEach(async (todo) => {
    await db.todo_table.update(todo.index, {'checked': todo.checked})
  })


}

async function searchTitle(word) {
  const todos = await db.todo_table.filter(function (todo) {
    // console.log(todo.title, word);
    return todo.title.indexOf(word) > -1;
  }).toArray();
  return await todos;
}


async function getQuery() {
  const todos = await db.todo_table.toArray(); 
  return await todos;
}

async function changeTaskProject(index, project) {
  // console.log(index, project);
  await db.todo_table.update(index, {'project': project})
  return await db.todo_table.toArray();
}

async function finishTask() {
  let todos = await db.todo_table.filter( function(todo) {
      return todo.checked;
    }
  ).toArray();

  todos.filter(function(todo) {
    return todo.project !== 'repeat'
  }).forEach(async function(todo) {
    await db.todo_table
      .update(todo.index, {'project': 'archive','exp': 0, 'finish_date': moment().format('YY-MM-DD')})
  })

  todos.filter(function(todo) {
    return todo.project == 'repeat'
  }).forEach(async function(todo) {
    await db.todo_table.update(todo.index, {'exp': todo.exp_init, 'checked': false})
  })


  return await db.todo_table.toArray();

}

async function changeTodo(index, todo) {
  // console.log(index, todo);
  await db.todo_table.update(index, todo);
}

async function deleteTodo(index) {
  await db.todo_table.where('index').equals(index).delete();
  return await db.todo_table.toArray();
}

export default {
  createDB,
  addTodo,
  changeChecked,
  getQuery,
  searchTitle,
  changeTaskProject,
  finishTask,
  changeTodo,
  deleteTodo,
}