import todosView from './view/todos';
import counterView from './view/counter';
import filtersView from './view/filters';

const registry = {
  todos: todosView,
  counter: counterView,
  filters: filtersView,
};

const renderWrapper = (component) => (targetElement, state) => {
  const element = component(targetElement, state);

  const childComponent = element.querySelectorAll('[data-component]');

  Array.from(childComponent).forEach((v) => {
    const name = v.dataset.component;
    const child = registry[name];
    if (!child) {
      return;
    }

    v.replaceWith(child(v, state));
  });

  return element;
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state) => {
  const clonComponent = (element) => element.cloneNode(true);
  return renderWrapper(clonComponent)(root, state);
};

export { add, renderRoot };
