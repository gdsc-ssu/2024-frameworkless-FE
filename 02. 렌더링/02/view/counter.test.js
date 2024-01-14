import counterView from './counter';

let targetElement;

describe('counterView', () => {
  beforeEach(() => {
    targetElement = document.createElement('div');
  });

  test('새로운 DOM 요소는 완료되지 않은 todo의 수를 가지고 있어야 한다.', () => {
    const newCounter = counterView(targetElement, {
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

    expect(newCounter.textContent).toBe('2 Items left');
  });

  test('완료하지 않은 todo가 1개일 경우를 고려해야 한다.', () => {
    const newCounter = counterView(targetElement, {
      todos: [
        {
          text: 'First',
          completed: true,
        },
        {
          text: 'Third',
          completed: false,
        },
      ],
    });

    expect(newCounter.textContent).toBe('1 Item left');
  });

  test('전부 완료했을 때의 경우도 고려해야 한다.', () => {
    const newCounter = counterView(targetElement, {
      todos: [
        {
          text: 'First',
          completed: true,
        },
        {
          text: 'Third',
          completed: true,
        },
      ],
    });

    expect(newCounter.textContent).toBe('No item left');
  });
});
