import applyDiff from './applyDiff';

describe('applyDiff', () => {
  let realContainer;
  let virtualContainer;

  beforeEach(() => {
    realContainer = document.createElement('div');
    virtualContainer = document.createElement('div');
    realContainer.innerHTML = `
          <div class="target">
              <span class="maintained">
                  <div>maintain</div>
              </span>
              <div class="text">i am text</div>
              <ul>
                  <li></li>
              </ul>
          </div>
      `;
    virtualContainer.innerHTML = `
          <div class="target">
              <a href="#" alt=""></a>
              <span class="removed">
                  <div class="inner">remove</div>
              </span>
              <div class="text">hello</div>
              <input type="text" />
          </div>
      `;
  });

  test('applyDiff가 삭제된 노드를 실제 DOM에 반영하여야 한다.', () => {
    applyDiff(realContainer, realContainer.children[0], virtualContainer.children[0]);

    expect(realContainer.querySelector('ul')).toBe(null);
  });

  test('applyDiff가 추가된 노드를 실제 DOM에 반영하여야 한다.', () => {
    applyDiff(realContainer, realContainer.children[0], virtualContainer.children[0]);

    expect(realContainer.querySelector('a')).not.toBe(null);
    expect(realContainer.querySelector('input')).not.toBe(null);
  });

  test('applyDiff가 기존 노드의 변경사항들을 실제 DOM에 반영하여야 한다.', () => {
    applyDiff(realContainer, realContainer.children[0], virtualContainer.children[0]);

    const span = realContainer.querySelector('span');
    const textDiv = realContainer.querySelector('div.text');

    expect(span.classList.contains('removed')).toBe(true);
    expect(span.classList.contains('maintained')).toBe(false);
    expect(textDiv.textContent).toBe('hello');
  });

  test('applyDiff의 결과로 나온 자식들의 개수가 정확해야한다.', () => {
    applyDiff(realContainer, realContainer.children[0], virtualContainer.children[0]);

    const targetNode = realContainer.querySelector('.target');

    expect(targetNode.children.length).toBe(4);
  });

  test('applyDiff가 DOM의 깊은 수준까지 변경사항을 반영해야한다.', () => {
    applyDiff(realContainer, realContainer.children[0], virtualContainer.children[0]);

    const innerNode = realContainer.querySelector('.inner');

    expect(innerNode).not.toBe(null);
    expect(innerNode.textContent).toBe('remove');
  });
});
