import React, { FunctionComponent } from 'react';
import { AppBar, IconButton, Toolbar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'components/Link';
import Discord from 'icons/Discord';
import GitHub from 'icons/GitHub';

const useStyles = makeStyles({
  appBar: {
    backgroundImage: 'url(/static/backgrounds/gun-metal.png)'
  },
  logo: {
    width: 170,
    height: 40,
    verticalAlign: 'middle',
    pointerEvents: 'none'
  },
  game: {
    height: 28,
    width: 47,
    marginLeft: 6
  },
  grow: {
    flex: 1
  },
  download: {
    marginRight: 20
  },
  summonerSearch: {
    width: 'auto',
    background: '#161416'
  },
  summonerSearchIconButton: {
    padding: 0
  }
});

const Header: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Link href="/">
          <img className={classes.logo} src="/static/text.webp" alt="Trophy Hunter" />
        </Link>
        <img className={classes.game} src="/static/pubg.png" alt="PUBG" />
        <div className={classes.grow} />

        <Tooltip title="GitHub">
          <IconButton href="https://github.com/lmachens/trophy-hunter-pubg" target="_blank">
            <GitHub />
          </IconButton>
        </Tooltip>
        <Tooltip title="Discord">
          <IconButton color="inherit" href="https://discord.gg/6aYTkbA" target="_blank">
            <Discord />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
