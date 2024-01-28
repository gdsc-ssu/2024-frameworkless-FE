import isNodeChanged from './isNodeChanged.js';

const isNodeRemoved = (realNode, virtualNode) => realNode && !virtualNode;
const isNodeCreated = (realNode, virtualNode) => !realNode && virtualNode;
const isIvalidNodeComparison = (realNode, virtualNode) => !realNode && !virtualNode;

const applyDiff = (parentNode, realNode, virtualNode) => {
  // 1. 노드가 삭제되었는지 확인한다.
  if (isNodeRemoved(realNode, virtualNode)) {
    realNode.remove();
    return;
  }

  // 2. 노드가 생성되었는지 확인한다.
  if (isNodeCreated(realNode, virtualNode)) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 3. 노드가 바뀌었는지 확인한다.
  if (isNodeChanged(realNode, virtualNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  // 4. 노드를 비교할 수 없는 경우에는 종료한다.
  if (isIvalidNodeComparison(realNode, virtualNode)) return;

  // 5. 노드 자체가 변경되지 않았다면 자식 노드가 변경되었는지 재귀적으로 확인한다.
  // 미리 노드들의 복사본을 만들어두고, 그 개수만큼 반복문을 돌면서 재귀적으로 applyDiff를 호출한다.
  // 재귀적으로 자식을 탐색하는 과정에서 노드의 객체에 변경사항이 적용되므로 미리 구해두지 않으면 길이가 변경될 수 있다.
  const realChildren = [...realNode.children];
  const virtualChildren = [...virtualNode.children];
  const maxChildrenSize = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < maxChildrenSize; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
