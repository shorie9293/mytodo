class Todo {
  // constructor ({id: id, project: project, title: title, type: type, exp: exp}) {
  //   this.id = id;
  //   this.project = project;
  //   this.title = title;
  //   this.type = type;
  //   this.exp = exp;
  // }
  constructor () {
    this.id = '';
    this.project = 'main';
    this.title = '';
    this.type = 'nexttask';
    this.exp = 1;
    this.exp_init = 1;
    this.checked = false;
    this.finish_date = '';
  }
}

export default {
  Todo,
}