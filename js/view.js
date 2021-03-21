export default class ViewTodo {
    constructor(){
        this.model = null;
        this.table = document.getElementById("table");
        const addButton = document.getElementById("add");
        addButton.onclick = () => {
            this.addTodo({title: "test1", desc: "test2"})
        }
    };


    setModel(model){
        this.model = model;
    };

    addTodo(todo){
        console.log(this.model.addTodo(todo));
    };
};