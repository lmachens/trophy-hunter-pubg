import React from 'react';
import { NextFunctionComponent } from 'next';
import { Typography, Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';

interface ErrorPageProps {
  message: string;
  statusCode: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 'auto',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(2)
  }
}));

const ErrorPage: NextFunctionComponent<ErrorPageProps> = ({ message, statusCode }) => {
  const classes = useStyles();

  const handleClick = () => {
    Router.replace(Router.route);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">{statusCode}</Typography>
      <Typography variant="h2">{message} :(</Typography>
      <Button className={classes.button} onClick={handleClick} variant="outlined" color="primary">
        Try again
      </Button>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  // @ts-ignore
  const statusCode = (res && res.statusCode) || (err && err.statusCode) || 500;
  const message = (res && res.statusMessage) || (err && err.message) || 'Internal Error';
  return { statusCode, message };
};

export default ErrorPage;
