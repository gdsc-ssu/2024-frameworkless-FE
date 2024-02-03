const addEvents = (targetElement, events) => {
  const { changeFilter } = events;

  targetElement.addEventListener('click', (event) => {
    changeFilter(event.target.textContent);
  });
};

export default (targetElement, { currentFilter }, events) => {
  const newFilters = targetElement.cloneNode(true);

  Array.from(newFilters.querySelectorAll('li a')).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });

  addEvents(newFilters, events);

  return newFilters;
};
