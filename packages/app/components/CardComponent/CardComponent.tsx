import React, { FunctionComponent } from 'react';
import { Card, CardHeader, Avatar, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface CardComponentProps {
  headerBackgroundColor: string;
  icon: React.ReactNode;
  title: string;
}

interface StyleProps {
  headerBackgroundColor: string;
}

const useStyles = makeStyles(theme => ({
  header: (props: StyleProps) => ({
    background: props.headerBackgroundColor
  }),
  content: {
    background: theme.palette.background.paper,
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  },
  player: {
    color: theme.palette.primary.main
  },
  avatar: {
    color: theme.palette.common.white,
    background: 'none',
    width: 'auto',
    overflow: 'visible',
    height: 20
  }
}));

const CardComponent: FunctionComponent<CardComponentProps> = ({
  children,
  headerBackgroundColor,
  icon,
  title
}) => {
  const classes = useStyles({ headerBackgroundColor });
  return (
    <Card>
      <CardHeader
        title={title}
        className={classes.header}
        avatar={icon && <Avatar className={classes.avatar}>{icon}</Avatar>}
      />
      <CardContent className={classes.content}>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
