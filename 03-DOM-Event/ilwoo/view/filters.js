export default (targetElement, { currentFilter }, events) => {
  const newCounter = targetElement.cloneNode(true);
  Array.from(newCounter.querySelectorAll('li a')).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });

  newCounter.addEventListener('click', (e) => {
    events.changeFilter(e.target.textContent);
  });

  return newCounter;
};
