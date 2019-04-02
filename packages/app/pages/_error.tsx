import React from 'react';
import { NextFunctionComponent } from 'next';
import { Typography } from '@material-ui/core';

interface ErrorPageProps {
  statusCode?: string;
}

const ErrorPage: NextFunctionComponent<ErrorPageProps> = ({ statusCode }) => {
  return (
    <Typography>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </Typography>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  // @ts-ignore
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default ErrorPage;
