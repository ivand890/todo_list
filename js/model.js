export default class ModelTodo {
  constructor() {
    this.PREFIX = "TODO_JS";
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem(`${this.PREFIX}_save_data`));
    if (!this.todos || this.todos.length === 0) {
      this.todos = [];
      this.currentId = 0;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  setView(view) {
    this.view = view;
  }

  getTodos() {
    return this.todos;
  }

  saveLocal() {
    localStorage.setItem(
      `${this.PREFIX}_save_data`,
      JSON.stringify(this.todos)
    );
  }

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);
    this.saveLocal();
  }

  toggleCompleted(id) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.saveLocal();
  }

  addTodo(title, description) {
    const newTodo = {
      id: this.currentId++,
      title: title,
      description: description,
      completed: false,
    };
    this.todos.push(newTodo);
    this.saveLocal();
    return { ...newTodo };
  }
}
