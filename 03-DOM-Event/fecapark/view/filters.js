export default (targetElement, { currentFilter }, events) => {
  const newFilter = targetElement.cloneNode(true);
  const filterButtons = newFilter.querySelectorAll('li a');

  Array.from(filterButtons).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      events.changeFilter(button.textContent);
    });
  });

  return newFilter;
};
