import applyDiff from './applyDiff.js';
import getTodos from './getTodos.js';
import { renderRoot } from './registry.js';

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 1000);

render();
