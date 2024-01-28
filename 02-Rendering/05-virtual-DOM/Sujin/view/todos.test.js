import todosView from './todos';

let targetElement;

describe('filtersView', () => {
  beforeEach(() => {
    targetElement = document.createElement('ul');
  });

  test('모든 todo 요소에 대해서 li 태그를 생성해야 한다.', () => {
    const newCounter = todosView(targetElement, {
      todos: [
        {
          text: 'First',
          completed: true,
        },
        {
          text: 'Second',
          completed: false,
        },
        {
          text: 'Third',
          completed: false,
        },
      ],
    });

    const items = newCounter.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  test('"todos"에 따라 모든 li 요소에 올바른 속성을 설정해야 한다.', () => {
    const newCounter = todosView(targetElement, {
      todos: [
        {
          text: 'First',
          completed: true,
        },
        {
          text: 'Second',
          completed: false,
        },
      ],
    });

    const [firstItem, secondItem] = newCounter.querySelectorAll('li');

    expect(firstItem.classList.contains('completed')).toBe(true);
    expect(firstItem.querySelector('.toggle').checked).toBe(true);
    expect(firstItem.querySelector('label').textContent).toBe('First');
    expect(firstItem.querySelector('.edit').value).toBe('First');

    expect(secondItem.classList.contains('completed')).toBe(false);
    expect(secondItem.querySelector('.toggle').checked).toBe(false);
    expect(secondItem.querySelector('label').textContent).toBe('Second');
    expect(secondItem.querySelector('.edit').value).toBe('Second');
  });
});
