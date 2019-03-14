import React, { FunctionComponent } from 'react';
import { RouterProps } from 'next/router';
import Link from 'components/Link';
import { Divider, ListItem, ListItemText } from '@material-ui/core';
import IssuesList from 'components/IssuesList';

interface ContributionDrawerContentProps {
  router: RouterProps;
}

const ContributionDrawerContent: FunctionComponent<ContributionDrawerContentProps> = ({
  router
}) => {
  return (
    <>
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
      <Divider />
      <IssuesList />
    </>
  );
};

export default ContributionDrawerContent;
