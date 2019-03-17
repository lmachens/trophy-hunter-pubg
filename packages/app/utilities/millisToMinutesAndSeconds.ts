const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60);
  const seconds = parseInt((millis % 60).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export default millisToMinutesAndSeconds;
