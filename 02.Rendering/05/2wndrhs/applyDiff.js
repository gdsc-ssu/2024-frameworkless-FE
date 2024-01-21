import isNodeChanged from './isNodeChanged.js';

const applyDiff = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (isNodeChanged(realNode, virtualNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  Array.from({ length: max }).forEach((_, i) => {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  });
};

export default applyDiff;
