import isNodeChanged from './isNodeChanged.js';

const applyDiff = (parentNode, realNode, virtualNode) => {
  // 새로운 노드가 정의되지 않은 경우
  if (realNode && !virtualNode) {
    realNode.remove(); // 실제 노드를 삭제
    return;
  }

  // 실제 노드가 정의되지 않았지만 가상 노드가 존재할 경우
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode); // 부모 노드에 추가
    return;
  }

  // 두 노드가 모두 정의된 경우
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode); // 두 노드 간에 차이가 있는지 확인
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  // 모든 하위 노드에 대해 동일한 diff 알고리즘 적용하기
  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
