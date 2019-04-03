const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.round(millis / 60) || 0;
  const seconds = parseInt((millis % 60).toFixed(0)) || 0;
  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export default millisToMinutesAndSeconds;
