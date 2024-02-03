let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, todoIndex, events) => {
  const { updateItem } = events;

  const editInput = targetElement.querySelector('input.edit');

  targetElement.addEventListener('dblclick', () => {
    targetElement.classList.add('editing');
    targetElement.querySelector('input.edit').focus();
  });

  editInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      updateItem(event.target.value, todoIndex);
      targetElement.classList.remove('editing');
    }
  });
};

const getTodoElement = (todo, todoIndex, events) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  element.querySelector('input.edit').value = text;
  element.querySelector('label').textContent = text;

  if (completed) {
    element.classList.add('completed');
    element.querySelector('input.toggle').checked = true;
  }

  addEvents(element, todoIndex, events);

  return element;
};

export default (targetElement, { todos }, events) => {
  const newTodoList = targetElement.cloneNode(true);

  newTodoList.innerHTML = '';

  todos
    .map((todo, todoIndex) => getTodoElement(todo, todoIndex, events))
    .forEach((element) => {
      newTodoList.appendChild(element);
    });

  return newTodoList;
};
