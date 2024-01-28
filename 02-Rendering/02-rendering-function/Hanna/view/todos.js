const todosView = (targetElement, { todos }) => {
  const element = targetElement.cloneNode(true);
  element.innerHTML = todos
    .map((todo) => {
      const { text, completed } = todo;
      return `
      <li class="${completed ? 'completed' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${completed ? 'checked' : ''}>
          <label>${text}</label>
        </div>
        <input class="edit" value="${text}">
      </li>
    `;
    })
    .join('');

  return element;
};

export default todosView;
