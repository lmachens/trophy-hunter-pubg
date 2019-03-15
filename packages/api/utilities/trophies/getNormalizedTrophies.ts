import trophies from './definitions';
import attributes from './attributes';

const getNormalizedTrophies = () => {
  return Object.values(trophies).map(trophy => {
    const normalizedAttributes = trophy.attributes.map(attribute => attributes[attribute]);
    return { ...trophy, attributes: normalizedAttributes };
  });
};

export default getNormalizedTrophies;
