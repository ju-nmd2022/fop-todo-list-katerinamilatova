// set all the variables here
const buttonElement = document.getElementById("button");
const allTasksContainer = document.getElementById("tasksContainer");
let helpingVar = true;

// array with all tasks

function buttonAddClicked() {
  let textField = document.getElementById("inputElement");
  let inputElementValue = inputElement.value;

  //1. create new div (new box)
  let newTaskDiv = document.createElement("div");
  newTaskDiv.classList.add("tasksItem");
  newTaskDiv.classList.add(inputElementValue);
  allTasksContainer.appendChild(newTaskDiv);

  //tick (checked, done)
  const newTick = document.createElement("p");
  newTick.innerHTML = "✔️";
  newTaskDiv.appendChild(newTick);
  newTick.addEventListener("click", () => {
    taskChecked(newTaskDiv, newTaskText);
  });

  // 2. show input as a htmlk text (innerHTML)
  let newTaskText = document.createElement("p");

  newTaskText.innerHTML = inputElementValue;
  newTaskDiv.appendChild(newTaskText);
  textField.value = "";

  //bin
  const newTaskBin = document.createElement("p");
  newTaskBin.innerHTML = "🗑";
  newTaskDiv.appendChild(newTaskBin);
  newTaskBin.addEventListener("click", () => {
    removeTask(newTaskDiv);
  });
}

function removeTask(task) {
  allTasksContainer.removeChild(task);
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

  // div se hodí pod zbytek tasku, které ještě splněny nejsou
}
