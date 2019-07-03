class Todo {
  constructor() {
    this.todoArray = [];
  }

  add(name, time) {
    if (!name || !time) {
      alert('Name or time cannot be empty.');
      return false;
    }

    name = name.trim();
    time = time.trim();

    if (name.length === 0 || time.length === 0) {
      alert('Name or time cannot be empty.');
      return false;
    }

    time = new Date(time);
    if (Number.isNaN(time)) {
      alert('Time has incorrect format.');
      return;
    }
    const now = new Date();
    if (time < now) {
      alert('Time is less that the current time.');
      return;
    }

    if (this.todoArray.find(todo => todo.name === name && todo.time === time)) {
      alert('Current todo is exist.');
      return false;
    }

    this.todoArray.push({ id: this.todoArray.length + 1, name, time, checked: false, completed: false });
    return true;
  }

  edit(id, name) {
    if (!id || !name) {
      return false;
    }

    const todo = this.todoArray.find(todo => todo.id === id);
    if (!todo) {
      return false;
    }

    todo.name = name;
    return true;
  }

  toggle(id, value) {
    if (!id) {
      return false;
    }

    const todo = this.todoArray.find(todo => todo.id === id);
    todo.completed = value;
  }

  delete(index) {
    const oldLength = this.todoArray.length;
    this.todoArray = this.todoArray.filter(todo => todo.id !== index);
    return oldLength !== this.todoArray.length;
  }

  list() {
    return this.todoArray;
  }
}
