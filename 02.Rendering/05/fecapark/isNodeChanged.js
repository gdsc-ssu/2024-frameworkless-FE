const checkAttributesChanged = (staleNode, freshNode) => {
  const checkHaveSameAttributeLength = () => {
    const staleAttributes = staleNode.attributes;
    const freshAttributes = freshNode.attributes;
    return staleAttributes.length === freshAttributes.length;
  };

  const checkHaveSameAttributeNames = () => {
    const staleAttributeNames = Array.from(staleNode.attributes).map(({ name }) => name);
    const freshAttributes = Array.from(freshNode.attributes).map(({ name }) => name);
    return staleAttributeNames.every((name) => freshAttributes.includes(name));
  };

  const checkHaveSameAttributeValues = () => {
    const staleAttributeNames = Array.from(staleNode.attributes).map(({ name }) => name);
    return staleAttributeNames.every((name) => {
      const staleValue = staleNode.getAttribute(name);
      const freshValue = freshNode.getAttribute(name);
      return staleValue === freshValue;
    });
  };

  if (!checkHaveSameAttributeLength()) return true;
  if (!checkHaveSameAttributeNames()) return true;
  if (!checkHaveSameAttributeValues()) return true;
  return false;
};

const checkHaveNoChildren = (staleNode, freshNode) =>
  staleNode.children.length === 0 && freshNode.children.length === 0;

const checkHaveSameTextContent = (staleNode, freshNode) => {
  const staleTextContent = staleNode.textContent;
  const freshTextContent = freshNode.textContent;
  return staleTextContent === freshTextContent;
};

const isNodeChanged = (staleNode, freshNode) => {
  // 두 노드의 attribute가 다른가?
  const attributeChanged = checkAttributesChanged(staleNode, freshNode);
  if (attributeChanged) return true;

  const haveNoChildren = checkHaveNoChildren(staleNode, freshNode);
  const haveSameTextContent = checkHaveSameTextContent(staleNode, freshNode);

  // 자식이 없는 두 노드가 다른 텍스트를 가지고 있는가?
  if (haveNoChildren && !haveSameTextContent) return true;

  return false;
};

export default isNodeChanged;
