const registry = {}; // export 하지 말아주세요!

const renderComponentWrapper = (component) => {
  const TARGET_COMPONENT_QUERY = '[data-component]';

  /**
   * data-component 속성이 추가된 Element들을 찾아 배열로 반환한다.
   */
  const getRenderTargetElementsIn = (element) => {
    const componentTargets = element.querySelectorAll(TARGET_COMPONENT_QUERY);
    return Array.from(componentTargets);
  };

  const getTargetComponentName = (targetComponent) => targetComponent.dataset.component;

  /**
   * 특정 컴포넌트를 렌더링함과 동시에 자식 컴포넌트들을 렌더링하는 wrapper 함수를 반환한다.
   */
  const wrapper = (targetContainer, state) => {
    const element = component(targetContainer, state);
    const targetElements = getRenderTargetElementsIn(element);

    targetElements.forEach((target) => {
      const componentName = getTargetComponentName(target);

      const childComponent = registry[componentName];

      if (!childComponent) return;

      target.replaceWith(childComponent(target, state));
    });

    return element;
  };

  return wrapper;
};

const add = (name, component) => {
  registry[name] = renderComponentWrapper(component);
};

const renderRoot = (root, state) => {
  // 이 컴포넌트 내부에 root를 렌더링한다. 따라서 state는 필요없다.
  const dummyComponent = (target) => target.cloneNode(true);
  const render = renderComponentWrapper(dummyComponent);
  return render(root, state);
};

export { add, renderRoot };
