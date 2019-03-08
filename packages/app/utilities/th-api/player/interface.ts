export interface Player {
  id: string;
  name: string;
  platform: string;
  matches: {
    type: 'match';
    id: string;
  }[];
}
