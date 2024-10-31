document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-btn');
    const clearButton = document.querySelector('.clear-btn');
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');

    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('.list-item').forEach(item => {
            const taskText = item.querySelector('.task-text').innerText;
            const isCompleted = item.querySelector('.text-textbox').checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTask(text, completed = false) {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'text-textbox';
        checkbox.checked = completed;

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.innerText = text;
        if (completed) taskText.style.textDecoration = 'line-through';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'task-delete-btn';
        deleteButton.innerText = 'x';

        checkbox.addEventListener('change', () => {
            taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            updateLocalStorage();
        });

        deleteButton.addEventListener('click', () => {
            listItem.remove();
            updateLocalStorage();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);

        updateLocalStorage();
    }

    addButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText) {
            createTask(taskText);
            todoInput.value = '';
        } else {
            alert('Empty text can not be a task');
        }
    });

    clearButton.addEventListener('click', () => {
        const confirmClear = confirm('Are you sure?');
        if (confirmClear) {
            todoList.innerHTML = '';
            localStorage.removeItem('tasks');
        }
    });

    window.addEventListener('load', () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            storedTasks.forEach(task => {
                createTask(task.text, task.completed);
            });
        }
    });
});
