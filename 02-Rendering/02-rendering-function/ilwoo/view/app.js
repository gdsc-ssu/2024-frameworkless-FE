import todosView from './todos.js';
import counterView from './counter.js';
import filtersView from './filters.js';

export default (targetElement, state) => {
  // index.js main 엘리먼트는 querySelector로 가져온 .todoapp 엘리먼트임.
  // targetElement = .todoapp (실제 DOM 엘리먼트)
  // 그래서 cloneNode 함수로 .todoapp 엘리먼트를 복사해서 element에 넣음
  const element = targetElement.cloneNode(true);

  // 복사한 element에서 각각의 엘리먼트를 가져와서 변수에 넣음
  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');

  // 각각의 엘리먼트를
  // todosView, counterView, filtersView 함수에 넣어서 state를 기반으로 만들어진 새로운 element를 replaceWith로 교체
  // state = [{text : 랜덤문자열, completed: true off false}]로 리턴
  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filtersView(filters, state));

  // 엘리먼트(list, counter, filters)를 새로 만들어진 엘리먼트로 교체된 .todoapp 엘리먼트를 리턴
  return element;
};
