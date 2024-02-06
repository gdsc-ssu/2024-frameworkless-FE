import getTodos from './getTodos.js';
import appView from './view/app.js';

const state = {
  todos: getTodos(), // dictonary 형태로 된 (text : 랜덤문자열, completed : true or false) 배열
  currentFilter: 'Active',
};

const main = document.querySelector('.todoapp'); // todoapp 클래스를 가진 엘리먼트 가져오기

window.requestAnimationFrame(() => {
  const newMain = appView(main, state);
  main.replaceWith(newMain);
});
