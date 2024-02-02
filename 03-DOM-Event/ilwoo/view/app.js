let template;

const createAppElement = () => {
  if (!template) {
    template = document.getElementById('todo-app');
  }

  return template.content.cloneNode(true);
};

export default (targetElement) => {
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());
  return newApp;
};
