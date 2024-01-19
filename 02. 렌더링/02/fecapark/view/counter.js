const getNotCompleteCount = (todos) => todos.filter((todo) => !todo.completed).length;
const getNotCompleteTextContent = (todos) => {
  const count = getNotCompleteCount(todos);
  if (count === 0) return 'No item left';
  if (count === 1) return '1 Item left';
  return `${count} Items left`;
};

export default (targetElement, state) => {
  const { todos } = state;

  const newElement = targetElement.cloneNode(true);
  newElement.textContent = getNotCompleteTextContent(todos);

  return newElement;
};
