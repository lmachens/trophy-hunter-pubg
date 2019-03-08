import { Link as MuiLink } from '@material-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { FunctionComponent } from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  }
});

const Link: FunctionComponent<NextLinkProps> = ({ children, href, ...other }) => {
  const classes = useStyles();

  return (
    <NextLink href={href} {...other}>
      <MuiLink className={classes.link}>{children}</MuiLink>
    </NextLink>
  );
};

export default Link;
