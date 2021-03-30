import ModelTodo from "./model.js";
import ViewTodo from "./view.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new ModelTodo();
  const view = new ViewTodo();
  model.setView(view);
  view.setModel(model);

  view.render();
});