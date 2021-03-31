import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
export default class ViewTodo {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.modal = new Modal();
    this.addTodoForm = new AddTodo();
    this.addTodoForm.onClick((title, description) => {
      this.addTodo(title, description);
    });
    this.modal.onClick((id, values) => {
      this.editTodo(id, values);
    });
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => {
      this.createRow(todo);
    });
  }
  addTodo(title, description) {
    const todo = this.model.addTodo(title, description);
    this.createRow(todo);
  }

  editTodo(id, values) {
    this.model.editTodo(id, values);
    const row = document.getElementById(id);
    row.children[0].innerHTML = values.title;
    row.children[1].innerHTML = values.description;
    row.children[2].children[0].checked = values.completed;
  }

  addRemoveButton(id) {
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
    removeBtn.innerHTML = "<i class='fa fa-trash'></i>";
    removeBtn.onclick = () => {
      this.model.removeTodo(id);
      document.getElementById(id).remove();
    };
    return removeBtn;
  }

  addEditButton(todo) {
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "mb-1");
    editBtn.innerHTML = "<i class='fa fa-pencil'></i>";
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#modal");
    editBtn.onclick = () => {
      this.modal.setValues(todo);
    };
    return editBtn;
  }

  addCheckbox(todo) {
    const checkbox = document.createElement("input");
    checkbox.classList.add("text-center");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onclick = () => {
      this.model.toggleCompleted(todo.id);
    };
    return checkbox;
  }

  createRow(todo) {
    const newRow = this.table.insertRow();
    newRow.setAttribute("id", todo.id);
    newRow.innerHTML = `
    <td>${todo.title}</td>
    <td>${todo.description}</td>
    <td class="text-center"></td>
    <td class="text-right"></td>
    `;
    const cbox = this.addCheckbox(todo);
    newRow.children[2].appendChild(cbox);
    const eBtn = this.addEditButton(todo);
    newRow.children[3].appendChild(eBtn);
    const rmBtn = this.addRemoveButton(todo.id);
    newRow.children[3].appendChild(rmBtn);
  }
}
