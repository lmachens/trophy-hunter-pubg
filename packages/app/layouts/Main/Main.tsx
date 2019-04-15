import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    height: 0
  }
});

const Main: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Main;
