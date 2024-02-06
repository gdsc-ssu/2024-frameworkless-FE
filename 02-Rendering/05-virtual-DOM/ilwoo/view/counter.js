const getTodoCount = (todos) => {
  // todos = [{text : 랜덤문자열, completed: true off false}]로 리턴
  const notCompleted = todos.filter((todo) => !todo.completed);
  // notCompleted = completed가 false인 요소들만 모아놓은 배열

  const { length } = notCompleted;
  if (length === 1) {
    return '1 Item left';
  }

  return `${length} Items left`;
};

export default (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};
