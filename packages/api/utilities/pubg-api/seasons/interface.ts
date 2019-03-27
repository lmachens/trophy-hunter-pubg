export default interface Seasons {
  data: {
    type: 'season';
    id: string;
    attributes: {
      isCurrentSeason: boolean;
      isOffseason: boolean;
    };
  }[];
  links: {
    self: string;
  };
  meta: {};
}

export interface Season {
  isCurrentSeason: boolean;
  isOffseason: boolean;
  id: string;
}
