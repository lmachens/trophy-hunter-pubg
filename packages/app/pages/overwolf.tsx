import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { NextFunctionComponent } from 'next';
import { Typography, Button, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 'auto',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(2)
  }
}));

const OverwolfPage: NextFunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Overwolf App</Typography>
      <Typography variant="h2">Download app for ingame overlay</Typography>
      <Button className={classes.button} variant="outlined" color="primary" disabled>
        Coming soon
      </Button>
    </div>
  );
};

export default OverwolfPage;
