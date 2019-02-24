type Players = Player[];

interface Player {
  type: 'player';
  id: string;
  attributes: any;
  relationships: any;
  links: any;
}

export default Players;
