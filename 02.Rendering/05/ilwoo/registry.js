const registry = {}; // export 하지 말아주세요!

// renderWrapper 함수가 반환하는 함수는 클로저가 되어 component 함수를 기억
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

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state) => {
  const cloneComponent = (target) => target.cloneNode(true);

  return renderWrapper(cloneComponent)(root, state);
};

export { add, renderRoot };
