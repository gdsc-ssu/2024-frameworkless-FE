import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';

const registry = {
  todos: todosView,
  counter: counterView,
  filters: filtersView,
}; // export 하지 말아주세요!

const renderWrapper = (component) => (targetElement, state) => {
  const element = component(targetElement, state);
  const childComponents = element.querySelectorAll('[data-component]');

  // registry에서 data-component 속성을 가진 모든 dom 요소 찾기
  Array.from(childComponents).forEach((target) => {
    const name = target.dataset.component;

    const child = registry[name];
    if (!child) {
      return;
    }
    // 요소가 발견되면 자식 구성요소 호출
    target.replaceWith(child(target, state));
  });
  return element;
};

// registry 접근자 메서드
const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

// 최초 DOM 요소에서 렌더링을 시작하려면
// 애플리케이션의 루트를 렌더링하는 메서드 제공
const renderRoot = (root, state) => {
  // eslint-disable-next-line no-shadow
  const cloneComponent = (root) => root.cloneNode(true);
  return renderWrapper(cloneComponent)(root, state);
};

export { add, renderRoot };
