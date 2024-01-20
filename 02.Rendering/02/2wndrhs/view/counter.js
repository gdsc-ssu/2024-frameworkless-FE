const getTodoCount = (todos) => {
  const notCompletedTodos = todos.filter((todo) => !todo.completed);
  if (notCompletedTodos.length === 1) {
    return '1 Item left';
  }

  return `${notCompletedTodos.length} Items left`;
};

const counterView = (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true);
  const newTodoCount = getTodoCount(todos);

  newCounter.textContent = newTodoCount;
  return newCounter;
};

export default counterView;
