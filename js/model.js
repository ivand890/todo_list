export default class ModelTodo {
  constructor() {
    this.view = null;
    this.todos = [];
    this.currentId = 0;
  }

  setView(view) {
    this.view = view;
  }

  getTodos() {
    return this.todos;
  }

  removeTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
  }

  addTodo(title, description) {
    const newTodo = {
      id: this.currentId++,
      title: title,
      description: description,
      completed: false,
    };
    this.todos.push(newTodo);
    console.log(this.todos);
    return { ...newTodo };
  }
}
