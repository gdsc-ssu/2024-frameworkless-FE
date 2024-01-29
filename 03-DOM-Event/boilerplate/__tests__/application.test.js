/* eslint-disable import/no-extraneous-dependencies */
import { jest } from '@jest/globals';
import { events, state, render } from '../index.js';

describe('DOM 이벤트 관리', () => {
  let addItemSpy;
  let updateItemSpy;
  let deleteItemSpy;
  let toggleItemCompletedSpy;
  let completeAllSpy;
  let clearCompletedSpy;
  let changeFilterSpy;

  beforeEach(() => {
    // requestAnimationFrame을 모킹
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
    // 스파이 초기화
    addItemSpy = jest.spyOn(events, 'addItem');
    updateItemSpy = jest.spyOn(events, 'updateItem');
    deleteItemSpy = jest.spyOn(events, 'deleteItem');
    toggleItemCompletedSpy = jest.spyOn(events, 'toggleItemCompleted');
    completeAllSpy = jest.spyOn(events, 'completeAll');
    clearCompletedSpy = jest.spyOn(events, 'clearCompleted');
    changeFilterSpy = jest.spyOn(events, 'changeFilter');

    // 초기 state 설정
    state.todos = [{ text: 'Test Todo', completed: false }];

    // 초기 DOM 설정
    document.body.innerHTML = `
    <body>
      <template id="todo-item">
        <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label></label>
            <button class="destroy"></button>
          </div>
          <input class="edit" />
        </li>
      </template>
      <template id="todo-app">
        <section class="todoapp">
          <header class="header">
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus />
          </header>
          <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox" />
            <label for="toggle-all"> Mark all as complete </label>
            <ul class="todo-list" data-component="todos"></ul>
          </section>
          <footer class="footer">
            <span class="todo-count" data-component="counter"> </span>
            <ul class="filters" data-component="filters">
              <li>
                <a href="#/">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <button class="clear-completed">Clear completed</button>
          </footer>
        </section>
      </template>
      <div id="root">
        <div data-component="app"></div>
      </div>
    </body>
    `;

    // DOM 렌더링
    render();
  });

  it('상단 입력 텍스트에 값을 입력하고 키보드의 Enter를 누르면 Todo 항목이 생성되어야 한다.', () => {
    // 텍스트 입력
    document.querySelector('.new-todo').value = 'New Todo';

    // 키보드 이벤트 발생
    document
      .querySelector('.new-todo')
      .dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));

    // addItem 핸들러가 호출되었는지 확인
    expect(addItemSpy).toHaveBeenCalled();

    // DOM 렌더링
    render();

    // todo 항목이 추가되었는지 확인
    expect(document.querySelector('.todo-list').children.length).toBe(2);
  });

  it('행을 더블 클릭하고 값을 변경한 후 키보드에서 Enter를 누르면 Todo 항목이 수정되어야 한다.', () => {
    // 더블 클릭 이벤트 발생
    document.querySelector('li').dispatchEvent(new MouseEvent('dblclick'));

    // 수정할 todo 항목 선택
    const editInput = document.querySelector('.edit');

    // 수정할 todo 항목에 값 입력
    editInput.value = 'Test Todo Edited';

    // 수정할 todo 항목에서 Enter 키보드 이벤트 발생
    editInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));

    // updateItem 핸들러가 호출되었는지 확인
    expect(updateItemSpy).toHaveBeenCalled();

    // DOM 렌더링
    render();

    // todo 항목이 수정되었는지 확인
    expect(
      document.querySelector('.todo-list').children[0].querySelector('label').textContent,
    ).toBe('Test Todo Edited');
  });

  it('행의 오른쪽에 있는 십자가를 클릭하면 Todo 항목이 삭제되어야 한다.', () => {
    // 클릭 이벤트 발생
    document.querySelector('.destroy').click();

    // deleteItem 핸들러가 호출되었는지 확인
    expect(deleteItemSpy).toHaveBeenCalled();

    // DOM 렌더링
    render();

    // todo 항목이 제거되었는지 확인
    expect(document.querySelector('.todo-list').children.length).toBe(0);
  });

  it('행의 왼쪽에 있는 원을 클릭하면 Todo 항목이 완료되었는지 확인할 수 있어야 한다.', () => {
    // 클릭 이벤트 발생
    document.querySelector('.toggle').click();

    // toggleItemCompleted 핸들러가 호출되었는지 확인
    expect(toggleItemCompletedSpy).toHaveBeenCalled();

    // DOM 렌더링
    render();

    // todo 항목이 완료되었는지 확인
    expect(document.querySelector('.todo-list').children[0].classList).toContain('completed');
    expect(document.querySelector('.todo-list').children[0].querySelector('.toggle').checked).toBe(
      true,
    );
  });

  it('왼쪽 상단 모서리에 있는 `V` 표시를 클릭하면 모든 Todo 항목을 완료 상태로 바꾼다.', () => {
    // 클릭 이벤트 발생
    document.querySelector('.toggle-all').click();

    // completeAll 핸들러가 호출되었는지 확인
    expect(completeAllSpy).toHaveBeenCalled();

    // DOM 렌더링
    render();

    // todo 항목이 완료되었는지 확인
    expect(document.querySelector('.todo-list').children[0].classList).toContain('completed');
    expect(document.querySelector('.todo-list').children[0].querySelector('.toggle').checked).toBe(
      true,
    );
  });

  it('`Clear completed` 레이블을 클릭하면 완료된 Todo 항목을 모두 삭제한다.', () => {
    // 완료된 todo 항목 추가
    state.todos.push({ text: 'Test Todo Completed', completed: true });

    // DOM 렌더링
    render();

    // 클릭 이벤트 발생
    document.querySelector('.clear-completed').click();

    // clearCompleted 핸들러가 호출되었는지 확인
    expect(clearCompletedSpy).toHaveBeenCalled();

    // DOM 렌더링
    render();

    // todo 항목이 제거되었는지 확인
    expect(document.querySelector('.todo-list').children.length).toBe(1);
  });

  it('하단의 필터 이름을 클릭하면 Todo 항목을 필터링한다.', () => {
    // 클릭 이벤트 발생
    document.querySelector('.filters a[href="#/completed"]').click();

    // changeFilter 핸들러가 호출되었는지 확인
    expect(changeFilterSpy).toHaveBeenCalled();

    // currentFiler가 변경되었는지 확인
    expect(state.currentFilter).toBe('Completed');

    // DOM 렌더링
    render();

    // todo 항목이 필터링되었는지 확인
    expect(document.querySelector('.todo-list').children.length).toBe(0);
  });
});
