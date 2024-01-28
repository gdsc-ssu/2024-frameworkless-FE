const getAllListAnchorsFrom = (element) => [...element.querySelectorAll('li a')];
const setSelectedClassNameToAnchors = (anchors, currentFilter) => {
  anchors.forEach((anchor) => {
    if (anchor.textContent === currentFilter) {
      anchor.classList.add('selected');
    } else {
      anchor.classList.remove('selected');
    }
  });
};

export default (targetElement, state) => {
  const { currentFilter } = state;

  const newElement = targetElement.cloneNode(true);
  const anchors = getAllListAnchorsFrom(newElement);
  setSelectedClassNameToAnchors(anchors, currentFilter);

  return newElement;
};
