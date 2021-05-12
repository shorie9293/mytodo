class Todo {
  constructor ({id: id, project: project, title: title, type: type, exp: exp}) {
    this.id = id;
    this.project = project;
    this.title = title;
    this.type = type;
    this.exp = exp;
  }
}

export default {
  Todo,
}