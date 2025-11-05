const taskList = document.getElementById("task-list");
const addedTask = document.getElementById("task-input");
const button = document.getElementById("add-btn");
let tasks = [];

// Load from localStorage if available
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    displayTask(i);
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTask(index) {
  const task = tasks[index];
  const li = document.createElement("li");
  li.className = "task";
  const span = document.createElement("span");
  span.textContent = task.text;

  if (task.completed) li.classList.add("completed");

  // toggle completed when clicked
  span.addEventListener("click", () => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) displayTask(i);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks.splice(index, 1);
    saveTasks();
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) displayTask(i);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

button.addEventListener("click", () => {
  const taskText = addedTask.value.trim();

  if (taskText) {
    tasks.push({
      text: taskText,
      completed: false,
    });

    saveTasks();
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) displayTask(i);

    addedTask.value = "";
    addedTask.focus();
  } else {
    alert("Please enter a task");
  }
});

// allow Enter key to add task
addedTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") button.click();
});
