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
    this.exp = 0;
    this.exp_init = 0;
    this.checked = false;
    this.finish_date = '';
  }
}

export default {
  Todo,
}