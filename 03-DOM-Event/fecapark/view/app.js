let template;

const createAppElement = () => {
  if (!template) {
    template = document.getElementById('todo-app');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  targetElement.querySelector('.new-todo').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      events.addItem(e.target.value);
      e.target.value = '';
    }
  });

  targetElement.querySelector('.toggle-all').addEventListener('click', () => {
    events.completeAll();
  });

  targetElement.querySelector('.clear-completed').addEventListener('click', () => {
    events.clearCompleted();
  });
};

export default (targetElement, states, events) => {
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());
  addEvents(newApp, events);
  return newApp;
};
