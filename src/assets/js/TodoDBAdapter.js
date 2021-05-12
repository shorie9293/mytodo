import {v4 as uuidv4} from 'uuid';
import Dexie from 'dexie';

let db;

async function createDB() {
  db = await new Dexie('maguroDB');
  // const id = uuidv4();
  await db.version(1).stores({todo_table: '++index, id, project, title, type'});
  //   await db.todo_table.add({
  //     id: id,
  //     project: 'project',
  //     title: 'title',
  //     type: 'tipe',
  //     exp: 'exp',
  // });
  db.on("populate", function() {
    // const id = uuidv4();
    console.log(db);
    db.todo_table.add({project: 'project'});
  });
  db.open();

  // async function populate() {
  //   // const id = uuidv4();
  //   console.log(db);
  //   await db.todo_table.add({project: 'project'});
  // }
}


async function addTodo(todo) {
  const id = uuidv4();
  await db.todo_table.put({
    id: id, 
    project: todo.project,
    title: todo.title,
    type: todo.type, 
    exp: todo.exp});
}

async function deleteTodo(id) {
  console.log(db.todo_table.where('id').anyOf(id).toArray());
}

export default {
  createDB,
  addTodo,
  deleteTodo,
}