const filtersView = (targetElement, { currentFilter }) => {
  const newFilters = targetElement.cloneNode(true);

  [...newFilters.querySelectorAll('li a')].forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });

  return newFilters;
};

export default filtersView;
