import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";
export default class ViewTodo {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.modal = new Modal();
    this.addTodoForm = new AddTodo();
    this.filters = new Filters();

    this.addTodoForm.onClick((title, description) => {
      this.addTodo(title, description);
    });

    this.modal.onClick((id, values) => {
      this.editTodo(id, values);
    });

    this.filters.onClick((filter) => {
      this.filter(filter);
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

  filter(filter) {
    const { type, words } = filter;
    const [, ...rows] = document.getElementsByTagName("tr");
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide =
          !title.innerText.includes(words) &&
          !description.innerText.includes(words);
      }

      const shouldBeCompleted = type === "completed";
      const isCompleted = completed.children[0].checked;
      if (type !== "all" && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add("d-none");
      } else {
        row.classList.remove("d-none");
      }
    }
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

    const cbox = document.createElement("input");
    cbox.classList.add("text-center");
    cbox.type = "checkbox";
    cbox.checked = todo.completed;
    cbox.onclick = () => {
      this.model.toggleCompleted(todo.id);
    };
    newRow.children[2].appendChild(cbox);

    const eBtn = document.createElement("button");
    eBtn.classList.add("btn", "btn-primary", "mb-1");
    eBtn.innerHTML = "<i class='fa fa-pencil'></i>";
    eBtn.setAttribute("data-toggle", "modal");
    eBtn.setAttribute("data-target", "#modal");
    eBtn.onclick = () => {
      this.modal.setValues({
        id: todo.id,
        title: newRow.children[0].innerHTML,
        description: newRow.children[1].innerHTML,
        completed: newRow.children[2].children[0].checked,
      });
    };
    newRow.children[3].appendChild(eBtn);

    const rmBtn = document.createElement("button");
    rmBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
    rmBtn.innerHTML = "<i class='fa fa-trash'></i>";
    rmBtn.onclick = () => {
      this.model.removeTodo(todo.id);
      document.getElementById(todo.id).remove();
    };
    newRow.children[3].appendChild(rmBtn);
  }
}
