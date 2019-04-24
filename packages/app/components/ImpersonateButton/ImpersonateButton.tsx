import React, { FunctionComponent } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/styles';
import { useAccount, useChangeAccount } from 'contexts/account';
import { Player } from 'utilities/th-api/player';

interface ImpersonateButtonProps {
  player: Player;
}

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ImpersonateButton: FunctionComponent<ImpersonateButtonProps> = ({ player }) => {
  const classes = useStyles();
  const account = useAccount();
  const changeAccount = useChangeAccount();

  const isFavorite = !!(account && account.playerName === player.name);

  const handleClick = () => {
    if (!isFavorite) {
      changeAccount({
        platform: player.platform,
        playerName: player.name,
        recentMatch: player.matches[0]
      });
    }
  };

  return (
    <Tooltip
      title={
        <>
          {isFavorite
            ? `Already impersonated as ${player.name}.`
            : `Impersonate as ${player.name}.`}
          <br />
          You will receive notifications and load this player on start.
        </>
      }
    >
      <div>
        <Button
          variant="contained"
          color={isFavorite ? 'secondary' : 'default'}
          onClick={handleClick}
          disabled={isFavorite}
        >
          {isFavorite ? (
            <StarIcon className={classes.leftIcon} />
          ) : (
            <StarBorderIcon className={classes.leftIcon} />
          )}
          Impersonate
        </Button>
      </div>
    </Tooltip>
  );
};

export default ImpersonateButton;
