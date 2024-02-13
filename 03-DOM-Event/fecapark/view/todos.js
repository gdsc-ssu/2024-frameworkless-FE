let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index, events) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  const editInput = element.querySelector('input.edit');
  const toggleInput = element.querySelector('input.toggle');
  const label = element.querySelector('label');
  const destroyButton = element.querySelector('button.destroy');

  editInput.value = text;
  label.textContent = text;

  if (completed) {
    element.classList.add('completed');
    toggleInput.checked = true;
  }

  destroyButton.addEventListener('click', () => {
    events.deleteItem(index);
  });

  element.addEventListener('dblclick', () => {
    element.classList.toggle('editing');
    element.querySelector('input.edit').focus();
  });

  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      events.updateItem(index, e.target.value);
      element.classList.remove('editing');
    }
  });

  toggleInput.addEventListener('change', () => {
    events.toggleItemCompleted(index);
  });

  return element;
};

const filterTodo = (todo, currentFilter) => {
  if (currentFilter === 'Active') {
    return !todo.completed;
  }

  if (currentFilter === 'Completed') {
    return todo.completed;
  }

  return true;
};

export default (targetElement, { todos, currentFilter }, events) => {
  const newTodoList = targetElement.cloneNode(true);

  newTodoList.innerHTML = '';

  todos
    .filter((todo) => filterTodo(todo, currentFilter))
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach((element) => {
      newTodoList.appendChild(element);
    });

  return newTodoList;
};
