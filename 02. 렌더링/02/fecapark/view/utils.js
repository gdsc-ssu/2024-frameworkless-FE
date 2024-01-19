export const createInnerHTML = (tagName, { attributes = {}, innerHTML = '' } = {}) => {
  const arrtibuteString = Object.entries(attributes)
    .map(([name, value]) => {
      if (typeof value === 'boolean') return value ? name : '';
      return `${name}="${value}"`;
    })
    .join(' ');
  const closeTagString = innerHTML !== '' ? `${innerHTML}</${tagName}>` : '';

  return `<${tagName} ${arrtibuteString}>${closeTagString}`;
};

export default {};
