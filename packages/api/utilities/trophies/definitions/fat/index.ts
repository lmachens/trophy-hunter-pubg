import Trophy from '../interface';
import attributes from '../../../attributes';

const fat: Trophy = {
  name: 'fat',
  title: 'Fat',
  author: 'lmachens',
  description: 'Travel at least 5000m by vehicles and walk at most 500m',
  attributes: [attributes.rideDistance.key, attributes.walkDistance.key],
  src: 'https://game-icons.net/1x1/skoll/fat.html',
  svgPath:
    'M164.803 436.846q25.188 8.773 59.822 11.544V491h-59.822v-54.154zM292.843 491h59.822v-54.574q-26.763 8.826-59.822 11.702V491zM255.606 21c-27.066 0-49.011 28.547-49.011 63.757 0 35.211 21.945 63.758 49.011 63.758 27.067 0 49.012-28.547 49.012-63.758 0-35.21-21.945-63.757-49.012-63.757zm220.68 286.337c0-89.733-68.092-165.906-160.71-189.205a83.226 83.226 0 0 1-11.997 21.945c-12.32 16.036-29.806 25.188-47.962 25.188-18.156 0-35.683-9.194-47.962-25.188a83.184 83.184 0 0 1-11.933-21.777c-92.283 23.498-160.008 99.524-160.008 189.037H68.25a144.202 144.202 0 0 1 15.931-66.193 148.578 148.578 0 0 0-3.232 30.803c0 88.893 30.635 160.92 175.068 160.92 153.332 0 175.068-72.08 175.068-160.972a148.075 148.075 0 0 0-3.233-30.761 144.17 144.17 0 0 1 15.9 66.203h32.535z',
  check: ({ playerStats }) => {
    return playerStats.rideDistance >= 5000 && playerStats.walkDistance <= 500;
  }
};

export default fat;
