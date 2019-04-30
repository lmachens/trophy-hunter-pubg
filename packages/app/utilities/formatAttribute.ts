const formatAttribute = (attribute: number | string, digits = 0) => {
  if (typeof attribute === 'number') {
    return (Math.round(attribute * 100) / 100 || 0).toFixed(digits);
  }
  return attribute;
};

export default formatAttribute;
