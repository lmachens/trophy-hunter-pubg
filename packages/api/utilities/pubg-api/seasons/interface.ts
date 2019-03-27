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
