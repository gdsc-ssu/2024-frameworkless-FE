const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
  <li ${completed ? 'class="completed"' : ''}>
    <div class="view">
      <input 
        ${completed ? 'checked' : ''}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`;
};

const todosView = (targetElement, { todos }) => {
  const newTodoList = targetElement.cloneNode(true);
  const newTodosElement = todos.map(getTodoElement).join('');

  newTodoList.insertAdjacentHTML('afterbegin', newTodosElement);
  return newTodoList;
};

export default todosView;
