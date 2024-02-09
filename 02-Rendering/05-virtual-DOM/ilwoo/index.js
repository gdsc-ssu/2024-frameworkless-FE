import getTodos from './getTodos.js';
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import applyDiff from './applyDiff.js';
import { add, renderRoot } from './registry.js';

const filters = ['All', 'Active', 'Completed'];

// registy.js에 있는 add 함수를 이용해서 todos, counter, filters를 등록
add('todos', todosView);
add('counter', counterView);
add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};



const render = () =>
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = renderRoot(main, state);
    applyDiff(document.body, main, newMain);
    //applyDiff는 현재노드와 가상DOM 노드를 비교해서 변경된 부분만 업데이트하는 함수
  });

window.setInterval(() => {
  state.todos = getTodos();
  state.currentFilter = filters[Math.floor(Math.random() * 3)];
  render();
}, 5000);

render();
