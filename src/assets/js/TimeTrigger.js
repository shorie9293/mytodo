import TodoDBAdapter from '@/assets/js/TodoDBAdapter'

let db = TodoDBAdapter;
// let date = new Date;
// let todos = [];
// todo_data: 
// [
//   {'rep': 'week', 'days': ['mon', 'tue']},
//   {'rep': 'week', 'days': ['wed', 'sun']},
//   {'rep': 'week', 'days': ['sat', 'sun']},
//   {'rep': 'week', 'days': ['tue', 'sun']},
//   {'rep': 'week', 'days': ['tue', 'mon']},
//   {'rep': 'week', 'days': ['thu', 'wed']},
// ],

db.createDB();

function getToday(todos, days) {
  // todos = await db.searchTitle(23);
  
  todos = todos.filter(element => {
    return days.some(el => element.days.includes(el));
  });
  
  todos.forEach(element => {
    console.log(element.days);
  });
  console.log('------------');
}


export default {
  getToday,

}