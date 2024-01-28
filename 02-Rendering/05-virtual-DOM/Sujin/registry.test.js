import { add, renderRoot } from './registry';

describe('registry 테스트', () => {
  it('renderRoot를 이용하여 컴포넌트를 렌더링할 수 있어야한다.', () => {
    const dummyElement = (target, className, innerHTML = '') => {
      const element = target.cloneNode(true);
      element.className = className;
      element.innerHTML = innerHTML;
      return element;
    };

    /* 
      렌더링할 가상 컴포넌트를 정의한다.
      아래와 같은 DOM을 렌더링한다.
      <div>
        <div data-component="A" class="aa"></div>
        <span data-component="B" class="bbb">
          <span class="test" />
        </span>
        <ul data-component="C" class="cccccc"></ul>
      </div>
    */
    const virtualComponents = [
      { name: 'A', component: (target) => dummyElement(target, 'aa') },
      {
        name: 'B',
        component: (target) => dummyElement(target, 'bbb', '<span class="test" />'),
      },
      { name: 'C', component: (target) => dummyElement(target, 'cccccc') },
    ];

    // 1. registry에 렌더링할 컴포넌트를 추가한다.
    virtualComponents.forEach(({ name, component }) => {
      add(name, component);
    });

    // 2. data-component 속성이 추가된 DOM을 생성한다.
    const root = document.createElement('div');
    root.innerHTML = `
      <div data-component="A"></div>
      <span data-component="B"></span>
      <ul data-component="C"></ul>
    `;

    // 3. renderRoot를 이용하여 root를 렌더링한다.
    const resultRoot = renderRoot(root, {});

    expect(resultRoot.querySelector('[data-component="A"]').className).toBe('aa');
    expect(resultRoot.querySelector('[data-component="B"]').className).toBe('bbb');
    expect(resultRoot.querySelector('[data-component="B"] > span.test')).not.toBe(null);
    expect(resultRoot.querySelector('[data-component="C"]').className).toBe('cccccc');
  });
});
