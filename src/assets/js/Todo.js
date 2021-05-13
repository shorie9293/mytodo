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
    this.project = '';
    this.title = '';
    this.type = '';
    this.exp = 0;
    this.checked = false;
  }
}

export default {
  Todo,
}