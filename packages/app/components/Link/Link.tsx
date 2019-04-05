import { Link as MuiLink } from '@material-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { FunctionComponent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface LinkProps
  extends Omit<NextLinkProps, 'children'>,
    Omit<MuiLinkProps, 'href' | 'onError'> {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
    userSelect: 'auto',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  }
});

const Link: FunctionComponent<LinkProps> = ({ children, href, ...other }) => {
  const classes = useStyles();

  return (
    <NextLink href={href}>
      <MuiLink className={classes.link} {...other}>
        {children}
      </MuiLink>
    </NextLink>
  );
};

export default Link;
