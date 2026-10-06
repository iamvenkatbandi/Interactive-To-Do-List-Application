const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* =========================
   DISPLAY TASKS
========================= */

function displayTasks(){

  taskList.innerHTML = "";

  if(tasks.length === 0){
    emptyMessage.style.display = "block";
  }
  else{
    emptyMessage.style.display = "none";
  }

  tasks.forEach((task, index) => {

    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
      <div class="task-content">

        <input type="checkbox" ${task.completed ? "checked" : ""}
        onchange="toggleTask(${index})">

        <span class="task-text ${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

      </div>

      <div class="task-actions">

        <button class="edit-btn" onclick="editTask(${index})">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button class="delete-btn" onclick="deleteTask(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>
    `;

    taskList.appendChild(li);

  });

  updateStats();
  saveTasks();
}

/* =========================
   ADD TASK
========================= */

function addTask(){

  const taskText = taskInput.value.trim();

  if(taskText === ""){
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  taskInput.value = "";

  displayTasks();
}

/* =========================
   DELETE TASK
========================= */

function deleteTask(index){

  tasks.splice(index, 1);

  displayTasks();
}

/* =========================
   EDIT TASK
========================= */

function editTask(index){

  const updatedTask = prompt(
    "Edit your task:",
    tasks[index].text
  );

  if(updatedTask !== null && updatedTask.trim() !== ""){

    tasks[index].text = updatedTask.trim();

    displayTasks();
  }
}

/* =========================
   TOGGLE COMPLETE
========================= */

function toggleTask(index){

  tasks[index].completed = !tasks[index].completed;

  displayTasks();
}

/* =========================
   UPDATE STATS
========================= */

function updateStats(){

  totalTasks.textContent = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

  completedTasks.textContent = completed;
}

/* =========================
   SAVE TO LOCAL STORAGE
========================= */

function saveTasks(){

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* =========================
   EVENT LISTENERS
========================= */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){
    addTask();
  }

});

/* =========================
   INITIAL LOAD
========================= */

displayTasks();