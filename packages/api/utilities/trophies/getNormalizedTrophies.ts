import trophies from './definitions';

interface NormalizedTrophy {
  name: string;
  title: string;
  author: string;
  description: string;
  attributes: string[];
  src: string;
  svgPath: string;
  checkString: string;
}

const getNormalizedTrophies = () => {
  return Object.values(trophies).map<NormalizedTrophy>(trophy => {
    const { check, ...other } = trophy;
    const checkString = `const check: Check = ${check.toString()}`;
    return { ...other, checkString };
  });
};

export default getNormalizedTrophies;
