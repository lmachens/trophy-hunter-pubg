interface Player {
  name: string;
  platform: string;
  matches: {
    type: 'match';
    id: string;
  }[];
}

export default Player;
