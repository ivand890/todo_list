import Alert from "./alert.js";
export default class AddTodo {
  constructor() {
    this.addButton = document.getElementById("add");
    this.title = document.getElementById("title");
    this.description = document.getElementById("description");
    this.alert = new Alert("alert");
  }

  onClick(callback) {
    this.addButton.onclick = () => {
      if (this.title.value === "" || this.description.value === "") {
        this.alert.show("Title and Description are required.");
      } else {
        callback(this.title.value, this.description.value);
        this.alert.hide();
        title.value = "";
        description.value = "";
      }
    };
  }
}
