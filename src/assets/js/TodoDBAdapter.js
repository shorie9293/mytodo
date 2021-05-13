import Dexie from 'dexie';

let db;

async function createDB() {
  db = await new Dexie('maguroDB');
  // const id = uuidv4();
  await db.version(1).stores({todo_table: '++index, id, project, title, type'});
  db.on("populate", function() {
    addTodo({
      project: 'main', 
      title: '最も目に入れておきたいタスクを入れます。例:仕事のことなど', 
      type: 'nexttask',
      exp: 5});
    addTodo({
      project: 'repeat', 
      title: '繰り返したいタスクを入れます。', 
      type: 'nexttask',
      exp: 3});
    addTodo({
      project: 'sub', 
      title: '通常のタスクを入れます。例:家でのことなど', 
      type: 'nexttask',
      exp: 1});
      });
  db.open();
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
  let oldtodo = await db.todo_table.where({'project':'main'}).toArray();
  const todo = oldtodo.filter((value,index) => {
    return value.checked !== todos['main'][index].checked; 
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

export default {
  createDB,
  addTodo,
  changeChecked,
  getQuery,
}