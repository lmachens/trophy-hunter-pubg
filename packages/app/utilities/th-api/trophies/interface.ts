import { Attributes } from '../attributes';

export interface Trophy {
  name: string;
  title: string;
  description: string;
  attributes: Attributes;
  svgPath: string;
}
