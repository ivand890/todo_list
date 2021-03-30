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

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);
  }

  toggleCompleted(id) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    console.log(this.todos);
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
