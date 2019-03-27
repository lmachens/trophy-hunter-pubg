import React from 'react';
import { NextFunctionComponent } from 'next';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  iframe: {
    flex: 1
  }
});

const DiscordPage: NextFunctionComponent = () => {
  const classes = useStyles();
  return (
    <iframe
      className={classes.iframe}
      src="https://discordapp.com/widget?id=320539672663031818&theme=dark"
      allowTransparency
      frameBorder={0}
    />
  );
};

export default DiscordPage;
