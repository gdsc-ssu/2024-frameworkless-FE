const isNodeChanged = (node1, node2) => {
  // 두 노드가 다른 개수의 속성을 가지면 true 반환
  if (node1.attributes.length !== node2.attributes.length) {
    return true;
  }
  // 노드1의 속성을 순회하면서 노드2도 같은 속성 값을 갖는지 확인
  const hasDifferentAttributes = Array.from(node1.attributes).some(
    ({ name, value }) => node2.getAttribute(name) !== value,
  );
  // 노드2가 노드1과 같은 속성 값을 갖지 않는다면 true 반환
  if (hasDifferentAttributes) {
    return true;
  }
  // 두 노드의 자식 노드가 없고 다른 텍스트 컨텐츠를 가지면 true 반환
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

export default isNodeChanged;
