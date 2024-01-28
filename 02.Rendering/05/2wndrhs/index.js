import getTodos from './getTodos.js';
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import applyDiff from './applyDiff.js';
import { add, renderRoot } from './registry.js';

const filters = ['All', 'Active', 'Completed'];

add('todos', todosView);
add('counter', counterView);
add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const main = document.querySelector('.todoapp');

const render = () =>
  window.requestAnimationFrame(() => {
    const newMain = renderRoot(main, state);
    applyDiff(document.body, main, newMain);
    // appView() 대신 registry.js 의 코드를 활용해보세요.
    // const newMain = appView(main, state);
    // main.replaceWith(newMain);
  });

window.setInterval(() => {
  state.todos = getTodos();
  state.currentFilter = filters[Math.floor(Math.random() * 3)];
  render();
}, 5000);

render();
