import AddTodo from "./components/add-todo.js";
export default class ViewTodo {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.addTodoForm = new AddTodo();
    this.addTodoForm.onClick((title, description) => {
      this.addTodo(title, description);
    });
  };

  setModel(model) {
    this.model = model;
  };

  addTodo(title, description) {
    const todo = this.model.addTodo(title, description);
    this.createRow(todo);
  };

  addRemoveButton(id) {
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
    removeBtn.innerHTML = "<i class='fa fa-trash'></i>";
    removeBtn.onclick = () => {
      this.model.removeTodo(id);
      document.getElementById(id).remove();
    };
    return removeBtn;
  };

  createRow(todo) {
    const newRow = this.table.insertRow();
    newRow.setAttribute('id', todo.id);
    newRow.innerHTML = `
    <td>${todo.title}</td>
    <td>${todo.description}</td>
    <td class="text-center">
      <input type="checkbox">
    </td>
    <td class="text-right">
      <button class="btn btn-primary mb-1">
        <i class="fa fa-pencil"></i>
      </button>
    </td>
    `;
    const rmBtn = this.addRemoveButton(todo.id);
    newRow.children[3].appendChild(rmBtn);
  };
};
