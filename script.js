const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
window.onload = loadTasks;

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = "";
}

function createTaskElement(taskText, done = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (done) li.classList.add("done");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    updateTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    li.remove();
    updateTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks in localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTaskElement(t.text, t.done));
}

function updateTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({ text: li.firstChild.textContent, done: li.classList.contains("done") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}