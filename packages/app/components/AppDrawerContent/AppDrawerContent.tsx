import React, { FunctionComponent } from 'react';
import { Divider } from '@material-ui/core';
import PlayerInfo from 'components/PlayerInfo';
import LastMatches from 'components/LastMatches';
import { RouterProps } from 'next/router';

interface AppDrawerContentProps {
  router: RouterProps;
}

const AppDrawerContent: FunctionComponent<AppDrawerContentProps> = ({ router }) => {
  return (
    <>
      <PlayerInfo selected={router.route === '/'} />
      <Divider />
      <LastMatches router={router} />
    </>
  );
};

export default AppDrawerContent;
