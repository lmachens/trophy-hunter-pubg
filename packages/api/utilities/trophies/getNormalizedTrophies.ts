import trophies from './definitions';
import attributesMap from './attributes';

interface NormalizedTrophy {
  name: string;
  title: string;
  author: string;
  description: string;
  attributes: {
    key: string;
    title: string;
    unit: string;
  }[];
  src: string;
  svgPath: string;
  checkString: string;
}

const getNormalizedTrophies = () => {
  return Object.values(trophies).map<NormalizedTrophy>(trophy => {
    const { attributes, check, ...other } = trophy;
    const normalizedAttributes = attributes.map(attribute => attributesMap[attribute]);
    const checkString = `const check: Check = ${check.toString()}`;
    return { ...other, attributes: normalizedAttributes, checkString };
  });
};

export default getNormalizedTrophies;
