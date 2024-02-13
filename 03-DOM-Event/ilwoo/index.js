/* eslint-disable no-use-before-define */
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import applyDiff from './applyDiff.js';
import registry from './registry.js';
import appView from './view/app.js'

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

export const state = {
  todos: [],
  currentFilter: 'All',
};

export const events = {
  addItem: text => {
    state.todos.push({
      text,
      complete: false //미완료로 추가
    })
    render();
  },
  updateItem: (index, text) => {
    state.todos[index].text = text;
    render();
  },
  deleteItem: (index) => {
    state.todos.splice(index, 1);//해당인덱스에서 1개를 제거
    render();
  },
  toggleItemCompleted: (index) => {
    state.todos[index].completed = !state.todos[index].completed;
    render();
  },
  completeAll: () => {
    state.todos.forEach(todo => todo.completed = true);
    render();
  },
  clearCompleted: () => {
    state.todos = state.todos.filter(todo => !todo.completed);
    render();
  },
  changeFilter: (filter) => {
    state.currentFilter = filter;
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
