import Dexie from 'dexie';

let db;

async function createDB() {

  db = new Dexie('maguroDB');
  db.version(4).stores({todo_table: '++index, id, project, title, type, checked, finish_date, repeated',monster_table: '++index'});
  db.on("populate", function() {
    db.monster_table.add({name:"HOGE",hp:50,at:40,df:40,img:"zetsubou.png", money:10});
  })
  await db.open();
}

export default {
    createDB,
}