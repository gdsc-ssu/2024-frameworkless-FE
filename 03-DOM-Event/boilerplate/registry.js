const registry = {};

const renderWrapper = (component) => (targetElement, state) => {
  const element = component(targetElement, state);

  const childComponents = element.querySelectorAll('[data-component]');

  Array.from(childComponents).forEach((target) => {
    const name = target.dataset.component;

    const child = registry[name];
    if (!child) {
      return;
    }

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

export default {
  add,
  renderRoot,
};
