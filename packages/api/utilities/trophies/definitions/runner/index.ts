import Trophy from '../interface';

const runner: Trophy = {
  name: 'runner',
  title: 'Runner',
  description: 'Walk at least 2000 meters',
  attributes: ['participantStats.walkDistance'],
  // https://game-icons.net/1x1/lorc/run.html
  svgPath:
    'M372.97 24.938c-8.67.168-17.816 3.644-26.69 10.28-12.618 9.44-24.074 25.203-30.5 44.844-6.424 19.642-6.48 39.12-1.874 54.157 4.608 15.036 13.375 25.225 24.97 29 11.593 3.772 24.724.72 37.343-8.72 12.618-9.44 24.074-25.234 30.5-44.875 6.424-19.642 6.512-39.12 1.905-54.156-4.607-15.038-13.404-25.196-25-28.97-2.9-.944-5.88-1.465-8.938-1.563-.573-.018-1.14-.01-1.718 0zm-155.69 69.78c-21.696.024-43.394 2.203-65.093 7.094-24.91 29.824-43.848 60.255-52.875 98.47l37.376 17.812c8.273-30.735 21.485-53.817 43.375-77 22.706-7.844 45.418-6.237 68.125 1.5-74.24 65.137-51.17 120.676-80.344 226.47-42.653 17.867-85.098 20.53-123.25-.002L23 415.625c59.418 27.09 125.736 29.818 190.844 0 20.368-43.443 27.214-88.603 25-132.906C295.31 354.663 323.11 398.2 338.78 498.56h57.94c-3.12-14.706-6.21-28.394-9.345-41.218-22.522-92.133-47.263-139.63-100.22-198.406 9.695-36.13 22.143-59.665 52.44-74.282 11.167 19.767 29.982 36.682 51.092 48.906l97.375 1.563.47-41.03L402 191.968c-8.05-5.556-14.925-11.73-20.75-18.314-14.886 9.08-32.024 12.563-48.156 7.313-18.422-5.997-31.143-21.962-37.063-41.282-3.482-11.37-4.742-24.05-3.686-37.25-25.017-4.884-50.047-7.746-75.063-7.72z',
  check: ({ participantStats }) => {
    return participantStats.walkDistance >= 2000;
  }
};

export default runner;
