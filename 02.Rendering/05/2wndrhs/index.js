import getTodos from './getTodos.js';
// eslint-disable-next-line no-unused-vars
import { add, renderRoot } from './registry.js';
import applyDiff from './applyDiff.js';

const filters = ['All', 'Active', 'Completed'];

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const main = document.querySelector('.todoapp');

const render = window.requestAnimationFrame(() => {
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
