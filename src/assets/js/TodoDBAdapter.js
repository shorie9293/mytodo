import Dexie from 'dexie';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import Todo from './Todo';

let db;

async function createDB() {
  let todo_1 = new Todo.Todo;
  todo_1.id = uuidv4();
  todo_1.title = '最も目に入れておきたいタスクを入れます。例:仕事のことなど';
  todo_1.exp = 5;
  todo_1.exp_init = 5;
  let todo_2 = new Todo.Todo;
  todo_2.id = uuidv4();
  todo_2.project = 'repeat';
  todo_2.title = '繰り返したいタスクを入れます。';
  todo_2.exp = 1;
  todo_2.exp_init = 1;
  todo_2.repeated = 'week';
  todo_2.repeated_day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  let todo_3 = new Todo.Todo;
  todo_3.id = uuidv4();
  todo_3.project = 'sub';
  todo_3.title = '通常のタスクを入れます。例:家でのことなど';
  todo_3.exp = 3;
  todo_3.exp_init = 3;

  db = new Dexie('maguroDB');
  db.version(3).stores({todo_table: '++index, id, project, title, type, checked, finish_date, repeated'});
  db.on("populate", function() {
    db.todo_table.bulkPut([
        todo_1, todo_2, todo_3
    ]);
  })
  await db.open();
}

async function addTodo(todo) {
  todo.index = undefined;
  await db.todo_table.put(todo);
}

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

async function changeTodo(todo) {

  await db.todo_table.update(todo.index, 
    { 
      "project" : todo.project,
      "title": todo.title, 
      "type": todo.type,
      "exp": todo.exp,
      "repeated": todo.repeated,
      "repeated_day": Object.keys(todo.repeated_day).map(function (key) {return todo.repeated_day[key]}),
      "repeated_date": todo.repeated_date,
      "repeated_flag": todo.repeated_flag,
    }
  );

}

async function deleteTodo(index) {
  await db.todo_table.where('index').equals(index).delete();
  return await db.todo_table.toArray();
}

async function getProjectTodo(project) {
  const data = await db.todo_table.where('project').equals(project).toArray(); 
  return data;
}

async function resetRepeatFlag(i) {
  if (i == 'week') {
    await db.todo_table.where('repeated').equals('week').modify({repeated_flag: false});
  }
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
  getProjectTodo,
  resetRepeatFlag,
}