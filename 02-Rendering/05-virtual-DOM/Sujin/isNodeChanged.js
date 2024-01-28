const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;

  // 속성 수가 다른지 확인
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  // 하나 이상의 속성이 변경되었는지 확인
  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });
  if (differentAttribute) {
    return true;
  }

  if (
    // 노드에는 자식이 없으며
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent // textContent가 다르다
  ) {
    return true;
  }
  return false;
};

export default isNodeChanged;
