import Trophy from '../interface';
import attributes from '../../attributes';

const addicted: Trophy = {
  name: 'addicted',
  title: 'Addicted',
  author: 'lmachens',
  description: 'Boost yourself at least five times',
  attributes: [attributes['participantStats.boosts'].key],
  src: 'https://game-icons.net/1x1/lorc/syringe.html',
  svgPath:
    'M112.182 18.393c-.37-.007-.77 0-1.205.023-3.172.16-8.473 2.174-14.688 7.078-9.654 32.85-35.603 60.926-71.335 72.012-3.3 6.59-4.446 11.897-4.215 15.156.268 3.77 1.223 5.062 3.895 6.502 5.342 2.88 21.9 2.56 44.19-10.31l4.843-2.795 4.752 2.944c35.087 21.744 53.66 39.973 72.885 69.553l23.517-23.518c-31.97-18.754-48.732-38.902-68.935-73.91l-2.696-4.67 2.7-4.673c15.082-26.124 14.602-44.643 11.354-50.133-1.42-2.4-2.482-3.214-5.062-3.26zM275.8 87.45c-28.745 0-52.638 21.59-56.323 49.36l-84.444 84.448c-27.773 3.684-49.36 27.58-49.36 56.322 0 31.276 25.553 56.832 56.83 56.832 30.934 0 56.253-25 56.808-55.805l96.89 96.89 13.214-13.216L185.88 238.747l25.31-25.312 93.576 93.574 13.214-13.215-93.574-93.574 12.614-12.613 123.535 123.536 13.215-13.215-96.842-96.842c30.76-.608 55.703-25.906 55.703-56.803 0-31.276-25.553-56.832-56.83-56.832zm0 18.69c21.176 0 38.143 16.968 38.143 38.143 0 21.176-16.967 38.143-38.144 38.143-21.18 0-38.144-16.967-38.144-38.143 0-21.175 16.965-38.144 38.143-38.144zM142.503 239.437c21.177 0 38.142 16.966 38.142 38.142 0 21.176-16.965 38.145-38.142 38.145-21.178 0-38.145-16.97-38.145-38.145 0-21.176 16.966-38.142 38.144-38.142zm263.168 61.544c-5.287 0-10.573 2.044-14.66 6.13l-29.858 29.86-27.183-27.19-13.214 13.214 27.183 27.19-42.594 42.593h-.002c-8.18 8.186-8.176 21.15 0 29.33 8.172 8.175 21.147 8.175 29.326-.005l85.664-85.668c8.18-8.177 8.18-21.147.002-29.322-4.09-4.09-9.378-6.133-14.664-6.133zm-8.352 84.9L384.105 399.1l97.885 97.884 13.215-13.214-97.885-97.885z',
  check: ({ participantStats }) => {
    return participantStats.boosts >= 5;
  }
};

export default addicted;
