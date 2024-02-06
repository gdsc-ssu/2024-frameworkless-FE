const getTodoElement = (todo) => {
  // 아까 faker.js로 생성
  // text는 랜덤으로 생성되어있고
  // completed는 랜덤으로 true or false가 생성되어있음
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

// targetElement = app.js에서 querySelect한 .todo-list 엘리먼트
export default (targetElement, { todos }) => {
  // 복사한 .todo-app 엘리먼트에서 querySelector로 .todo-list 엘리먼트를 가져옴
  // 이미 targetElement를 복사했으니 굳이 복사할 필요가 없는거 아닌가?
  // 그냥 이과정 생략하고 targetElement를 그대로 사용해도 되지 않을까?
  // 아무튼 .todo-list 엘리먼트를 newTodoList 변수에 넣고
  const newTodoList = targetElement.cloneNode(true);
  // state = todos 배열(getTodoElement)
  // map함수는 배열의 각 요소에 대해 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
  // 배열들을 join으로 합침
  // 여러개의 li 문자열 요소가 todosElements에 들어감
  const todosElements = todos.map(getTodoElement).join('');
  // newTodoList에 innerHTML로 todosElements(문자열)를 넣음
  newTodoList.innerHTML = todosElements;
  // 마지막으로 반환
  return newTodoList;
};
