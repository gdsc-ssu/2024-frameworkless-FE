import getTodos from './getTodos.js';
import counterView from './view/counter.js';
import todosView from './view/todos.js';
import filtersView from './view/filters.js';
import { add, renderRoot } from './registry.js';

const REFRESH_STATE_INTERVAL = 500;
const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const render = () => {
  window.requestAnimationFrame(() => {
    const staleRoot = document.querySelector('.todoapp');
    const freshRoot = renderRoot(staleRoot, state);
    staleRoot.replaceWith(freshRoot);
  });
};

const renderWithNewState = () => {
  state.todos = getTodos();
  render();
};

window.onload = () => {
  add('todos', todosView);
  add('counter', counterView);
  add('filters', filtersView);

  setInterval(renderWithNewState, REFRESH_STATE_INTERVAL);
};
