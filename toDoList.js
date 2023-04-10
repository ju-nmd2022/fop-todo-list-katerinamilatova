// set all the variables here
const buttonElement = document.getElementById("button");
const allTasksContainer = document.getElementById("tasksContainer");
let helpingVar = true;

let allTasks = [];

function createTask(taskDescription) {
  //1. create new div (new box)
  let newTaskDiv = document.createElement("div");
  newTaskDiv.classList.add("tasksItem");

  //tick (checked, done)
  const newTick = document.createElement("p");
  newTick.innerHTML = "✔️";
  newTick.addEventListener("click", () => {
    //I call anynomous function which calls the function taskChecked with parameters newTaskDiv and NewTaskText
    taskChecked(newTaskDiv, newTaskText);
  });
  newTaskDiv.appendChild(newTick);

  // 2. show input as a html text (innerHTML)
  let newTaskText = document.createElement("p");
  newTaskText.innerHTML = taskDescription;
  newTaskDiv.appendChild(newTaskText);

  //bin
  const newTaskBin = document.createElement("p");
  newTaskBin.innerHTML = "🗑";
  newTaskDiv.appendChild(newTaskBin);
  newTaskBin.addEventListener("click", () => {
    removeTask(newTaskDiv, taskDescription);
  });

  // save task to storage
  //I save the tasksDescription as a string to allTasks
  allTasks.push(taskDescription);
  rewriteLocalStorage();
  //in this moment I created a whole new div (with text, bin, etc)
  return newTaskDiv;
}

function buttonAddClicked() {
  let textField = document.getElementById("inputElement");
  let inputElementValue = inputElement.value;

  let newTaskDiv = createTask(inputElementValue);

  allTasksContainer.appendChild(newTaskDiv);
  // empty the text field
  textField.value = "";
}

function removeTask(task, taskDescription) {
  allTasksContainer.removeChild(task);
  // remove item from allTasks array
  // the following 4 lines were taken from https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
  const index = allTasks.indexOf(taskDescription);
  if (index > -1) {
    // only splice array when item is found
    allTasks.splice(index, 1); // 2nd parameter means remove one item only
  }
  rewriteLocalStorage();
}

function rewriteLocalStorage() {
  //I change the array to stringified JSON (bc local storage can save only strings)
  let stringifiedTasks = JSON.stringify(allTasks);
  //for a key all tasks I save the value of stringified array
  localStorage.setItem("allTasks", stringifiedTasks);
}

function taskChecked(task, text) {
  if (helpingVar === true) {
    // text will get crossed out and the colours will change
    task.style.backgroundColor = "#ac94f4";
    text.style.textDecoration = "line-through";
    text.style.textDecorationColor = "rgb(243, 155, 243)";
    text.style.color = "white";
    helpingVar = false;
  } else {
    task.style.backgroundColor = "white";
    text.style.textDecoration = "none";
    text.style.color = "rgb(105, 103, 103)";
    helpingVar = true;
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
    let task = createTask(allTasksParsed[i]);
    allTasksContainer.appendChild(task);
  }
}
