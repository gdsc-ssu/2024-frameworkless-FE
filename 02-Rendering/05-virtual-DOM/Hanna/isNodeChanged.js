const isNodeChanged = (n1, n2) => {
  const n1Attributes = n1.attributes;
  const n2Attributes = n2.attributes;
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = n1.getAttribute(name);
    const attribute2 = n2.getAttribute(name);
    return attribute1 !== attribute2;
  });

  if (differentAttribute) {
    return true;
  }

  if (n1.children.length === 0 && n2.children.length === 0 && n1.textContent !== n2.textContent) {
    return true;
  }

  return false;
};

export default isNodeChanged;
