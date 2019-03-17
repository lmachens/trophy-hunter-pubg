import React, { FunctionComponent } from 'react';
import { RouterProps } from 'next/router';
import Link from 'components/Link';
import { Divider, ListItem, ListItemText } from '@material-ui/core';

interface ContributionDrawerContentProps {
  router: RouterProps;
}

const ContributionDrawerContent: FunctionComponent<ContributionDrawerContentProps> = ({
  router
}) => {
  return (
    <>
      <Link href="/contribution">
        <ListItem button selected={router.route === '/contribution'}>
          <ListItemText primary="Requests" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/contribution/trophies/create">
        <ListItem button selected={router.route === '/contribution/trophies/create'}>
          <ListItemText primary="Create Trophy" />
        </ListItem>
      </Link>
      <Link href="/contribution/issues/create">
        <ListItem button selected={router.route === '/contribution/issues/create'}>
          <ListItemText primary="Create Issue" />
        </ListItem>
      </Link>
    </>
  );
};

export default ContributionDrawerContent;
