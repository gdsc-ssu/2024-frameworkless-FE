/* eslint-disable no-use-before-define */
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import appView from './view/app.js';
import applyDiff from './applyDiff.js';

import registry from './registry.js';

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

export const state = {
  todos: [],
  currentFilter: 'All',
};

export const events = {
  addItem(text) {
    state.todos.push({
      text,
      completed: false,
    });

    render();
  },
  updateItem(text, todoIndex) {
    state.todos[todoIndex].text = text;

    render();
  },
  deleteItem() {},
  toggleItemCompleted() {},
  completeAll() {},
  clearCompleted() {},
  changeFilter() {},
};

export const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render();
