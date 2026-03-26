// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks to the list
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerText = task.text;
        if (task.completed) {
            li.classList.add('task-complete');
        }
        li.addEventListener('click', () => toggleTaskCompletion(index));
        taskList.appendChild(li);
    });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
    if (taskInput.value) {
        tasks.push({ text: taskInput.value, completed: false });
        taskInput.value = '';
        saveTasks();
    }
});

// Toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Initial render
renderTasks();