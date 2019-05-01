const formatAttribute = (attribute: number | string, digits = 0) => {
  if (typeof attribute === 'number') {
    return (Math.round(attribute * 100) / 100 || 0).toFixed(digits);
  }
  if (typeof attribute === 'string') {
    if (attribute === 'alive') {
      return 'Alive';
    }
    if (attribute === 'byplayer') {
      return 'By Player';
    }
    if (attribute === 'suicide') {
      return 'Suicide';
    }
    if (attribute === 'logout') {
      return 'Logout';
    }
  }
  return attribute;
};

export default formatAttribute;
