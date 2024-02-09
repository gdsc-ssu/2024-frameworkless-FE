const registry = {}; // export 하지 말아주세요!

//renderWrapper의 호출결과는 component 
const renderWrapper = (component) => (targetElement, state) => {
  const element = component(targetElement, state);

  // 요소의 data-coponent 속성을 가진 자식 요소를 모두 찾아서
  const childComponents = element.querySelectorAll('[data-component]');

  Array.from(childComponents).forEach((target) => {
    const name = target.dataset.component; // data-component 속성의 값
    const child = registry[name];
    // child(target) 함수는 새로운 DOM 요소를 반환
    target.replaceWith(child(target, state));
  });

  return element;
};
// name = {todos, counter, filters}, component = todosView, counterView, filtersView
const add = (name, component) => {
  registry[name] = renderWrapper(component);
  //registry = {todos: renderWrapper(todosView), counter: renderWrapper(counterView), filters: renderWrapper(filtersView)}
  //registry 딕셔너리 변수에 각 renderWrapper 함수를 맵핑
};

const renderRoot = (root, state) => {
  //root = main 엘리먼트, state = {todos: getTodos(), currentFilter: 'All'}
  const cloneComponent = (target) => target.cloneNode(true);

  return renderWrapper(cloneComponent)(root, state);
  //복사된 컴포넌트 
};

export { add, renderRoot };
