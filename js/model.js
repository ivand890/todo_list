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

  addTodo(todo) {
    const newTodo = { id: this.currentId++, ...todo, completed: false };
    this.todos.push(newTodo);
    return { ...newTodo };
  }
}
