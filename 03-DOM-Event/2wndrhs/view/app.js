let template;

const createAppElement = () => {
  if (!template) {
    template = document.getElementById('todo-app');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  const { addItem } = events;

  const newTodoInput = targetElement.querySelector('.new-todo');

  newTodoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      addItem(event.target.value);
      newTodoInput.value = '';
    }
  });
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);

  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());

  addEvents(newApp, events);

  return newApp;
};
