export default (targetElement, { currentFilter }) => {
  // currentFilter = indext.js에서 All설정 (All, Active, Completed 중 하나)
  const newCounter = targetElement.cloneNode(true);
  Array.from(newCounter.querySelectorAll('li a')).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });
  return newCounter;
};
