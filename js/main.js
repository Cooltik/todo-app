const todoName = document.getElementById('name');
const todoTime = document.getElementById('time');
const todoList = document.getElementById('todoList');
const emptyList = document.getElementById('emptyList');

const todoApp = new Todo();

const addClick = () => {
  const name = todoName.value;
  const time = todoTime.value;
  const result = todoApp.add(name, time);
  if (result) {
    refresh();
    clear();
  }
};

const refresh = () => {
  const elements = todoApp.list();

  // Delete all child in UL element
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Add new list elements if we have one
  createListElements(elements);

  toggle();
};

const createListElements = (elements) => {
  if (!elements) {
    return;
  }

  elements.forEach((el) => {
    const li = document.createElement('li');
    const editInput = document.createElement('input');

    // Complete todo button
    const completeBtn = document.createElement('input');
    completeBtn.type = 'checkbox';
    completeBtn.checked = el.completed;
    completeBtn.onclick = () => {
      todoApp.toggle(el.id, completeBtn.checked);
      refresh();
    };

    // Name of todo
    const span = document.createElement('span');
    span.className = 'name';
    span.title = 'Click to edit';
    span.innerText = `${el.name} (${el.time.getHours()}:${el.time.getMinutes()})`;
    span.onclick = () => {
      li.classList.toggle('edit');
    };

    // Delete button
    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.className = 'btn btn-delete';
    button.onclick = () => {
      const result = todoApp.delete(el.id);
      if (result) {
        refresh();
      }
    };

    // Edit input
    editInput.value = el.name;
    editInput.className = 'input input-edit';

    // Complete edit button
    const editComplete = document.createElement('button');
    editComplete.className = 'btn btn-edit';
    editComplete.innerText = 'OK';
    editComplete.onclick = () => {
      const result = todoApp.edit(el.id, editInput.value);
      if (result) {
        li.classList.toggle('edit');
        refresh();
      }
    };

    // List element
    if (el.completed) {
      li.classList.add('completed');
    }
    li.append(completeBtn);
    li.append(span);
    li.append(editInput);
    li.append(editComplete);
    li.append(button);
    todoList.append(li);
  });
};

const toggle = () => {
  const list = todoApp.list();
  if (list.length === 0) {
    emptyList.style.display = '';
    todoList.style.display = 'none';
  } else {
    emptyList.style.display = 'none';
    todoList.style.display = '';
  }
};

const clear = () => {
  todoName.value = '';
  todoTime.value = '';
  todoName.focus();
};

const setupTimeCheck = () => {
  setInterval(() => {
    const currentHour = (new Date()).getHours();
    const currentMinutes = (new Date()).getMinutes();
    // Filter all unchecked todo's in the current time
    let list = todoApp.list().filter(todo => !todo.completed
      && !todo.checked
      && todo.time.getHours() === currentHour
      && todo.time.getMinutes() === currentMinutes);

    if (list.length === 0) {
      return;
    }

    list.forEach(el => {
      alert('Reminder for:\n' + el.name);
      el.checked = true;
    });
  }, 1000); // Check all todo's every second
};

const setup = () => {
  toggle();
  setupTimeCheck();
};

setup();
