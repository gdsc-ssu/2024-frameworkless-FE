import { createInnerHTML } from './utils';

describe('유틸리티 함수 테스트', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  test('createInnerHTML: 빈 태그를 잘 생성하는가?', () => {
    const tagNames = ['div', 'input', 'span', 'a', 'ul', 'li'];

    tagNames.forEach((tagName) => {
      container.innerHTML = createInnerHTML(tagName);
      const testTarget = container.querySelector(tagName);

      expect(testTarget.tagName).toBe(tagName.toUpperCase());
      expect(testTarget.innerHTML).toBe('');
    });
  });

  test('createInnerHTML: 속성을 잘 할당하는가?', () => {
    container.innerHTML = createInnerHTML('input', {
      attributes: {
        class: 'test-input',
        type: 'checkbox',
        checked: true,
      },
    });
    const testTarget = container.querySelector('input');

    expect(testTarget.className).toBe('test-input');
    expect(testTarget.type).toBe('checkbox');
    expect(testTarget.checked).toBe(true);
  });

  test('createInnerHTML: innerHTML을 잘 할당하는가?', () => {
    const html = [
      createInnerHTML('div', {
        attributes: {
          class: 'inner-div',
        },
        innerHTML: 'hello',
      }),
      createInnerHTML('input', {
        attributes: {
          class: 'inner-input',
          type: 'number',
          value: '1',
        },
      }),
    ].join('');

    container.innerHTML = createInnerHTML('div', {
      attributes: {
        class: 'test-container',
      },
      innerHTML: html,
    });
    const testTarget = container.querySelector('.test-container');
    const innerDiv = testTarget.querySelector('.inner-div');
    const innerInput = testTarget.querySelector('.inner-input');

    expect(innerDiv.textContent).toBe('hello');
    expect(innerInput.value).toBe('1');
  });
});
