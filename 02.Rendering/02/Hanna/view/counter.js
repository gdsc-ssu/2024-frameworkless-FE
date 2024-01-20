const getNotCompleted = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;

  if (length === 1) {
    return '1 Item left';
  }

  return `${length} Items left`;
};

const counterView = (targetElement, { todos }) => {
  const element = targetElement.cloneNode(true);
  element.textContent = getNotCompleted(todos);
  return element;
};

export default counterView;
