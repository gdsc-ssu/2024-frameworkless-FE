import { createInnerHTML } from './utils.js';

const getTodoItemElement = ({ text, completed }) => {
  const toggle = createInnerHTML('input', {
    attributes: {
      class: 'toggle',
      type: 'checkbox',
      checked: completed,
    },
  });
  const label = createInnerHTML('label', {
    innerHTML: text,
  });
  const edit = createInnerHTML('input', {
    attributes: {
      class: 'edit',
      value: text,
    },
  });
  const viewBox = createInnerHTML('div', {
    attributes: {
      class: 'view',
    },
    innerHTML: toggle + label,
  });

  return createInnerHTML('li', {
    attributes: {
      class: completed ? 'completed' : '',
    },
    innerHTML: `${viewBox}${edit}`,
  });
};

export default (targetElement, state) => {
  const { todos } = state;

  const innerHTML = todos.map((todo) => getTodoItemElement(todo)).join('');

  const newElement = targetElement.cloneNode(true);
  newElement.innerHTML = innerHTML;

  return newElement;
};
