// set all the variables here
const buttonElement = document.getElementById("button");
const allTasksContainer = document.getElementById("tasksContainer");
let helpingVar = true;

let allTasks = [];

function createTask(taskDescription, done) {
  //1. create new div (new box)
  let newTaskDiv = document.createElement("div");
  newTaskDiv.classList.add("tasksItem");

  //tick (checked, done)
  const newTick = document.createElement("p");
  newTick.innerHTML = "✔️";
  newTick.addEventListener("click", () => {
    // Following 6 lines were created in cooperation with Lukáš Toral
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].desc == taskDescription) {
        // ! negates a boolean
        allTasks[i].done = !allTasks[i].done;
        rewriteLocalStorage();
        taskChecked(newTaskDiv, newTaskText, allTasks[i].done);
      }
    }
  });
  newTaskDiv.appendChild(newTick);

  let newTaskText = document.createElement("p");
  newTaskText.innerHTML = taskDescription;
  taskChecked(newTaskDiv, newTaskText, done);
  newTaskDiv.appendChild(newTaskText);

  //bin
  const newTaskBin = document.createElement("p");
  newTaskBin.innerHTML = "🗑";
  newTaskDiv.appendChild(newTaskBin);
  newTaskBin.addEventListener("click", () => {
    removeTask(newTaskDiv, taskDescription);
    rewriteLocalStorage();
  });

  // save task to storage
  //I save the tasksDescription as a string to allTasks
  allTasks.push({ desc: taskDescription, done: done });
  rewriteLocalStorage();
  //in this moment I created a whole new div (with text, bin, etc)
  return newTaskDiv;
}

function buttonAddClicked() {
  let textField = document.getElementById("inputElement");
  let inputElementValue = inputElement.value;

  let newTaskDiv = createTask(inputElementValue, false);

  allTasksContainer.appendChild(newTaskDiv);
  // empty the text field
  textField.value = "";
}

function removeTask(task, taskDescription) {
  allTasksContainer.removeChild(task);
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].desc === taskDescription) {
      allTasks.splice(i, 1); // 2nd parameter means remove one item only
    }
  }
}

function rewriteLocalStorage() {
  //I change the array to stringified JSON (bc local storage can save only strings)
  let stringifiedTasks = JSON.stringify(allTasks);
  //for a key all tasks I save the value of stringified array
  localStorage.setItem("allTasks", stringifiedTasks);
}

function taskChecked(task, text, done) {
  console.log(text);
  if (done === true) {
    // text will get crossed out and the colours will change
    task.style.backgroundColor = "#ac94f4";
    text.style.textDecoration = "line-through";
    text.style.textDecorationColor = "rgb(243, 155, 243)";
    text.style.color = "white";
  } else {
    task.style.backgroundColor = "white";
    text.style.textDecoration = "none";
    text.style.color = "rgb(105, 103, 103)";
  }
}

function loadTasksFromStorage() {
  let allTasksString = localStorage.getItem("allTasks");
  let allTasksParsed = JSON.parse(allTasksString);

  //this is to avoid a warning in console about allTasksParsed having zero lenght
  if (allTasksParsed.length === 0) {
    return;
  }

  for (let i = 0; i < allTasksParsed.length; i++) {
    let task = createTask(allTasksParsed[i].desc, allTasksParsed[i].done);

    allTasksContainer.appendChild(task);
  }
}
