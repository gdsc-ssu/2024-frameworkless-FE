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
  addItem: (text) => {
    state.todos = [...state.todos, { text, completed: false }];
    render();
  },
  updateItem: (index, text) => {
    state.todos[index].text = text;
    render();
  },
  deleteItem: (index) => {
    state.todos = [...state.todos.slice(0, index), ...state.todos.slice(index + 1)];
    render();
  },
  toggleItemCompleted: (index) => {
    state.todos[index].completed = !state.todos[index].completed;
    render();
  },
  completeAll: () => {
    state.todos = state.todos.map((todo) => ({ ...todo, completed: true }));
    render();
  },
  clearCompleted: () => {
    state.todos = state.todos.filter((todo) => !todo.completed);
    render();
  },
  changeFilter: (willChangedFilter) => {
    state.currentFilter = willChangedFilter;
    render();
  },
};

export const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render();
