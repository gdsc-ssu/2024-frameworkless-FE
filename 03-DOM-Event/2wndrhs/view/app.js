let template;

const createAppElement = () => {
  if (!template) {
    template = document.getElementById('todo-app');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  const { addItem, completeAll, clearCompleted } = events;

  const newTodoInput = targetElement.querySelector('.new-todo');
  const toggleAllInput = targetElement.querySelector('.toggle-all');
  const clearCompletedButton = targetElement.querySelector('.clear-completed');

  newTodoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addItem(event.target.value);
      newTodoInput.value = '';
    }
  });

  toggleAllInput.addEventListener('click', () => {
    completeAll();
  });

  clearCompletedButton.addEventListener('click', () => {
    clearCompleted();
  });
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);

  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());

  addEvents(newApp, events);

  return newApp;
};
