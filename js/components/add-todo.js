export default class AddTodo {
  constructor(){
    this.addButton = document.getElementById("add");
    this.title = document.getElementById("title");
    this.description = document.getElementById("description");
  };

  onClick(callback){
    this.addButton.onclick = () => {
      if (this.title.value === "" || this.description.value === "") {
        console.log("INCORRECTO")
      } else {
        callback(this.title.value, this.description.value);
        title.value = "";
        description.value = "";
      };
    };
  };
};