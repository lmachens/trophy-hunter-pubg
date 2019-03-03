interface Player {
  type: 'player';
  id: string;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    patchVersion: string;
    stats: null;
    titleId: string;
    shardId: string;
  };
  relationships: {
    matches: {
      data: {
        type: 'match';
        id: string;
      }[];
    };
    assets: {
      data: [];
    };
  };
  links: {
    schema: '';
    self: string;
  };
}

interface Players {
  data: Player[];
  links: {
    self: string;
  };
  meta: {};
}

export default Players;
