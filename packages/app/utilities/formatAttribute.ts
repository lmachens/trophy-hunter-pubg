const formatAttribute = (attribute: number | string) => {
  if (typeof attribute === 'number') {
    return Math.floor(attribute);
  }
  return attribute;
};

export default formatAttribute;
