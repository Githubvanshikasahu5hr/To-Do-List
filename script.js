const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

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

const toggleTask = index => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
};

const editTask = index => {
    const newTaskName = prompt('Edit Task', tasks[index].name);
    if (newTaskName) {
        tasks[index].name = newTaskName.trim();
        saveTasks();
        renderTasks();
    }
};

const deleteTask = index => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        document.querySelector('.filter.active').classList.remove('active');
        filter.classList.add('active');
        renderTasks(filter.dataset.filter);
    });
});

renderTasks();
