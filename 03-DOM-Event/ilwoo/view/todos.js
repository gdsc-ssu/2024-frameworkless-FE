let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index) => {
  const { text, completed } = todo;
  //구조분해 할당을 사용하여 text와 completed를 가져옴
  //const text = todo.text;
  //const completed = todo.completed;

  const element = createNewTodoNode();

  element.querySelector('input.edit').value = text;
  element.querySelector('label').textContent = text;

  if (completed) {
    element.classList.add('completed');

    element.querySelector('input.toggle').checked = true;
  }
  
  //이벤트 활용
  element.dataset.index = index;

  return element;
};

export default (targetElement, state, events) => {
  const { todos } = state
  const { deleteItem, updateItem } = events
  const newTodoList = targetElement.cloneNode(true)

  newTodoList.innerHTML = ''

  todos.map((todo, index) => getTodoElement(todo, index))
    .forEach(element => {
      newTodoList.appendChild(element)
    })

  newTodoList.addEventListener('click', e => {
    if (e.target.matches('button.destroy')) {
      deleteItem(e.target.closest('li').dataset.index)
    }
  })

  newTodoList.addEventListener('dblclick', e => {
    if (e.target.matches('label')) {
      e.target.closest('li').classList.add('editing')
      e.target.closest('li').querySelector('input.edit').focus()
    }
  })

  newTodoList.addEventListener('keydown', e => {
    if (e.target.matches('input.edit') && e.key === 'Enter') {
        e.target.closest('li').classList.remove('editing')
        updateItem(e.target.closest('li').dataset.index, e.target.value)
    }
  })


  return newTodoList;
};
