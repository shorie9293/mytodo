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

function getToday(todos) {
  // todos = await db.searchTitle(23);
  const monday = todos.filter( todo => {
      return todo.days.forEach(day => {
        console.log(day)
        if (day == 'mon') {
          day.index;
          return true;
        } else {
          return false;
        }
      });
      // if (todo.title == date.getDate()) console.log(`This is todays task: ${todo.index}`);
    }
  )

  console.log(monday);
}

export default {
  getToday,

}