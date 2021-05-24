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


async function getToday() {
  await db.createDB();
  // todos = await db.searchTitle(23);
  const todos = await db.getRepeatedTodo();

  console.log(todos);
  const days = ['fri','tue'];
  let repeated_todo_today = todos.filter(element => {
    // console.log('repeated_day' in element)
    if(!('repeated_day' in element)) {
      return;
    }
      // console.log(element.repeated_day)
    return days.some(el => element.repeated_day.includes(el));
    // }
  })
  // todos = todos.filter(element => {
  //   return days.some(el => element.days.includes(el));
  // });

  repeated_todo_today = repeated_todo_today.forEach(element => {
    console.log(element);
    element.project = 'now';
    element.repeated = 'none';
    db.addTodo(element);
  });

  return repeated_todo_today
  // console.log('------------');
}


export default {
  getToday,

}