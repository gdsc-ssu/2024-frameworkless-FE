import isNodeChanged from './isNodeChanged';

describe('isNodeChanged', () => {
  test('두 노드의 어트리뷰트, 텍스트 컨텐츠가 동일하다면 false 반환', () => {
    const node1 = document.createElement('div');
    node1.setAttribute('class', 'container');
    node1.textContent = 'Hello, world!';

    const node2 = document.createElement('div');
    node2.setAttribute('class', 'container');
    node2.textContent = 'Hello, world!';

    expect(isNodeChanged(node1, node2)).toBe(false);
  });

  test('두 노드가 다른 어트리뷰트를 가지면 true 반환', () => {
    const node1 = document.createElement('div');
    node1.setAttribute('class', 'container');
    node1.textContent = 'Hello, world!';

    const node2 = document.createElement('div');
    node2.setAttribute('class', 'wrapper');
    node2.setAttribute('id', 'myDiv');
    node2.textContent = 'Hello, world!';

    expect(isNodeChanged(node1, node2)).toBe(true);
  });

  test('두 노드가 같은 어트리뷰트를 갖지만 어트리뷰트의 값이 다르면 true 반환', () => {
    const node1 = document.createElement('div');
    node1.setAttribute('class', 'container');
    node1.textContent = 'Hello, world!';

    const node2 = document.createElement('div');
    node2.setAttribute('class', 'wrapper');
    node2.textContent = 'Hello, world!';

    expect(isNodeChanged(node1, node2)).toBe(true);
  });

  test('두 노드가 다른 텍스트 컨텐츠를 가지면 true 반환', () => {
    const node1 = document.createElement('div');
    node1.setAttribute('class', 'container');
    node1.textContent = 'Hello, world!';

    const node2 = document.createElement('div');
    node2.setAttribute('class', 'container');
    node2.textContent = 'Hello, GitHub Copilot!';

    expect(isNodeChanged(node1, node2)).toBe(true);
  });

  test('두 노드가 어트리뷰트, 텍스트 컨텐츠를 가지지 않으면 false 반환', () => {
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');

    expect(isNodeChanged(node1, node2)).toBe(false);
  });
});
