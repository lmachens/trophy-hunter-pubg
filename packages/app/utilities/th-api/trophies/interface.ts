import { Attributes } from '../attributes';

export interface Trophy {
  name: string;
  title: string;
  author: string;
  description: string;
  attributes: Attributes;
  src: string;
  svgPath: string;
  checkString: string;
}
