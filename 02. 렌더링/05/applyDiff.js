const applyDiff = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (realNode.tagName !== virtualNode.tagName) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.childNodes);
  const virtualChildren = Array.from(virtualNode.childNodes);

  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i += 1) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
