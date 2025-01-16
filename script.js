// Select DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Render tasks
const renderTasks = (filter = 'all') => {
    todoList.innerHTML = '';
    tasks
        .filter(task => filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed))
        .forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.name}</span>
                <div>
                    <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
};

// Add a task
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = todoInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        renderTasks();
        todoInput.value = '';
    }
});

// Toggle task completion
const toggleTask = index => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

// Edit a task
const editTask = index => {
    const newTaskName = prompt('Edit Task', tasks[index].name);
    if (newTaskName) {
        tasks[index].name = newTaskName.trim();
        saveTasks();
        renderTasks();
    }
};

// Delete a task
const deleteTask = index => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

// Filter tasks
filters.forEach(filter => {
    filter.addEventListener('click', () => {
        document.querySelector('.filter.active').classList.remove('active');
        filter.classList.add('active');
        renderTasks(filter.dataset.filter);
    });
});

// Initial render
renderTasks();