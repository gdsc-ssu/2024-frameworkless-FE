import isNodeChanged from './isNodeChanged.js';

const applyDiff = (parentNode, realNode, virtualNode) => {
  //실제노드가 있고 가상노드가 없으면 실제노드를 삭제
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  //실제노드가 없고 가상노드가 있으면 가상노드를 추가
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

  //실제노드와 가상노드중 자식노드가 큰 갯수를 가진 길이를 반환해서 반복
  const max = Math.max(realChildren.length, virtualChildren.length);
  Array.from({ length: max }).forEach((_, i) => {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  });
};

export default applyDiff;
