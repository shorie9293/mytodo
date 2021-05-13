import Dexie from 'dexie';
// import {uuidv4} from 'uuid';

let db;

async function createDB() {
  db = await new Dexie('maguroDB');
  await db.version(1).stores({todo_table: '++index, id, project, title, type'});
  await db.on("populate", function() {
    db.todo_table.bulkPut([
      {
        // id: uuidv4(),
        project: 'main', 
        title: '最も目に入れておきたいタスクを入れます。例:仕事のことなど', 
        type: 'nexttask',
        exp: 5,
        checked: false,
      },
      {
        // id: uuidv4(),
        project: 'repeat', 
        title: '繰り返したいタスクを入れます。', 
        type: 'nexttask',
        exp: 3,
        checked: false,
      },
      {
        // id: uuidv4(),
        project: 'sub', 
        title: '通常のタスクを入れます。例:家でのことなど', 
        type: 'nexttask',
        exp: 1,
        checked: false,
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
    checked: todo.checked});
}

// async function changeTodo(todo) {
//   console.log(db.todo_table.where({'id':todo.id}).toArray());
// }

async function changeChecked(todos) {
  let oldtodo = await db.todo_table.toArray();
  const todo = await oldtodo.filter((value,index) => {
    return value.checked !== todos[index].checked; 
  });

  if (todo[0]) {
    console.log(todo[0].index, todo[0].checked);
    await db.todo_table.update(
      todo[0].index,
      {'checked': !todo[0].checked}
    );
  }

}


async function getQuery(project) {
  const todos = await db.todo_table.where({'project': project }).toArray(); 
  return await todos;
}

async function getQuery2() {
  const todos = await db.todo_table.toArray(); 
  return await todos;
}


export default {
  createDB,
  addTodo,
  changeChecked,
  getQuery,
  getQuery2,
}