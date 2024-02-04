const registry = {};

const renderWrapper = (component) => (targetElement, state, events) => {
  const element = component(targetElement, state, events);

  const childComponents = element.querySelectorAll('[data-component]');

  Array.from(childComponents).forEach((target) => {
    const name = target.dataset.component;

    const child = registry[name];
    if (!child) {
      return;
    }

    target.replaceWith(child(target, state, events));
  });

  return element;
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state, events) => {
  const cloneComponent = (target) => target.cloneNode(true);

  return renderWrapper(cloneComponent)(root, state, events);
  //renderWrapper(cloneComponent) 익명함수의 또 익명함수를 호출?
};

// export는 객체를 내보낼 때 사용하는 키워드입니다.
// export에 지정하지 않은 변수나 함수는 외부에서 사용할 수 없음.
export default {
  add,
  renderRoot,
};
