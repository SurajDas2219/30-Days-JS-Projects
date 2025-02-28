document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  // Add Task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    // Prevent duplicate tasks
    if (tasks.some((task) => task.text === taskText)) {
      alert("Task already exists!");
      return;
    }

    const newTask = { id: Date.now(), text: taskText, completed: false };
    tasks.push(newTask);
    updateLocalStorage();
    renderTasks();
    taskInput.value = "";
  });

  // Handle "Enter" key press to add task
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      form.dispatchEvent(new Event("submit"));
    }
  });

  // Render Tasks
  function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
      taskList.innerHTML = "<p>No tasks available. Add a new task!</p>";
      return;
    }

    const fragment = document.createDocumentFragment();

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      li.classList.toggle("completed", task.completed);

      // Toggle completion
      li.addEventListener("click", () => {
        task.completed = !task.completed;
        updateLocalStorage();
        renderTasks();
      });

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tasks = tasks.filter((t) => t.id !== task.id);
        updateLocalStorage();
        renderTasks();
      });

      li.appendChild(deleteBtn);
      fragment.appendChild(li);
    });

    taskList.appendChild(fragment);
  }

  // Update Local Storage
  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
