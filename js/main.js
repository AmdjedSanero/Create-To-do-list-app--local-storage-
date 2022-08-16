let input = document.querySelector(".text-input");
let submit = document.querySelector(".btnSubmit");
let boxbottom = document.querySelector(".box-bottom");

let arrayOfTasks = [];
getTaskFromLocal();
addTaskToPage(arrayOfTasks);

//Add Tast
submit.onclick = function () {
  if (input.value != "") {
    addTaskToArray(input.value);

    input.value = "";
  }
};
function addTaskToArray(textInput) {
  const task = {
    id: Date.now(),
    title: textInput,
    done: false,
  };
  arrayOfTasks.push(task);
  //add to page
  addTaskToPage(arrayOfTasks);
  //add task to local storage
  addTaskToLocal(arrayOfTasks);
}
function addTaskToPage(arrayOfTasks) {
  boxbottom.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    div = document.createElement("div");

    if (task.done) {
      div.className = "done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    var deleteSpan = document.createElement("span");
    deleteSpan.className = "del";
    deleteSpan.appendChild(document.createTextNode("Delete"));
    div.appendChild(deleteSpan);
    boxbottom.appendChild(div);
  });
}
function addTaskToLocal(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getTaskFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    arrayOfTasks = tasks;
  }
}
boxbottom.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("del") &&
    !e.target.parentElement.classList.contains("done")
  ) {
    e.target.parentElement.remove();
    deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.className == "") {
    e.target.className = "done";
    doneTaskWithId(e.target.getAttribute("data-id"));
  } else if (e.target.className == "done") {
    e.target.className = "";
    doneTaskWithId(e.target.getAttribute("data-id"));
  }
});
function deleteTaskWithId(id) {
  let data = window.localStorage.getItem("tasks");

  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == id) {
      console.log(arrayOfTasks[i].id);
      arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
    }
  }
  window.localStorage.removeItem("tasks");
  addTaskToLocal(arrayOfTasks);
  console.log(arrayOfTasks);
}
function doneTaskWithId(id) {
  let data = window.localStorage.getItem("tasks");

  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == id && arrayOfTasks[i].done == false) {
      arrayOfTasks[i].done = true;
    } else if (arrayOfTasks[i].id == id && arrayOfTasks[i].done == true) {
      arrayOfTasks[i].done = false;
    }
  }
  window.localStorage.removeItem("tasks");
  addTaskToLocal(arrayOfTasks);
  console.log(arrayOfTasks);
}
