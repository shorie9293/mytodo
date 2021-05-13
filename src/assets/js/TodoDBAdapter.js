import {v4 as uuidv4} from 'uuid';
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
  const id = uuidv4();
  await db.todo_table.put({
    id: id, 
    project: todo.project,
    title: todo.title,
    type: todo.type, 
    exp: todo.exp,
    checked: false});
}

async function deleteTodo(id) {
  console.log(db.todo_table.where('id').anyOf(id).toArray());
}

async function getQuery(project) {
  const hoge = await db.todo_table.where({'project': project }).toArray() 
  console.log(hoge[0])
  return await hoge;
}

export default {
  createDB,
  addTodo,
  deleteTodo,
  getQuery,
}