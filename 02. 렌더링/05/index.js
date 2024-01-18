import getTodos from './getTodos.js';

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const main = document.querySelector('.todoapp');

window.requestAnimationFrame(() => {
  // appView() 대신 registry.js 의 코드를 활용해보세요.
  // const newMain = appView(main, state);
  // main.replaceWith(newMain);
});
