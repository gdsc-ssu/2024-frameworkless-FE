import filtersView from './filters';

let targetElement;
const TEMPLATE = `<ul class="filters">
    <li>
        <a href="#/">All</a>
    </li>
    <li>
        <a href="#/active">Active</a>
    </li>
    <li>
        <a href="#/completed">Completed</a>
    </li>
</ul>`;

describe('filtersView', () => {
  beforeEach(() => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = TEMPLATE;
    [targetElement] = tempElement.childNodes;
  });

  test('"currentFilter"와 동일한 텍스트를 가지는 anchor 태그에 "selected" 클래스를 추가해야 한다.', () => {
    const newCounter = filtersView(targetElement, {
      currentFilter: 'Active',
    });

    const selectedItem = newCounter.querySelector('li a.selected');

    expect(selectedItem.textContent).toBe('Active');
  });
});
