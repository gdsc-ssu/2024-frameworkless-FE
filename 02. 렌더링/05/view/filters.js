const filtersView = (targetElement, { currentFilter }) => {
  const element = targetElement.cloneNode(true);
  Array.from(element.querySelectorAll('li a')).forEach((v) => {
    if (v.textContent === currentFilter) {
      v.classList.add('selected');
    } else {
      v.classList.remove('selected');
    }
  });

  return element;
};

export default filtersView;
