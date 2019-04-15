import React from 'react';
import { getIssues } from 'utilities/octokit';
import { IssuesListForRepoResponseItem } from '@octokit/rest';
import { makeStyles } from '@material-ui/styles';
import { Link as MuiLink, Typography, Button } from '@material-ui/core';
import { NextFunctionComponent } from 'next';
import Link from 'components/Link';

interface ContributionPageProps {
  issues: IssuesListForRepoResponseItem[];
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(2)
  },
  action: {
    marginRight: theme.spacing(2)
  }
}));

const ContributionPage: NextFunctionComponent<ContributionPageProps> = ({ issues }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>
        Trophy Hunter is{' '}
        <MuiLink
          href="https://github.com/lmachens/trophy-hunter-pubg/blob/master/LICENSE"
          target="_blank"
        >
          Open Source
        </MuiLink>
        !<br />
        You can contribute on{' '}
        <MuiLink href="https://github.com/lmachens/trophy-hunter-pubg" target="_blank">
          GitHub
        </MuiLink>
        , <Link href="/contribution/issues/create">send feedback/report issues</Link> or submit{' '}
        <Link href="/contribution/trophies/create">trophy proposals</Link>.
      </Typography>
      <Typography variant="subtitle1">Latest Requests</Typography>
      {issues.map(issue => (
        <MuiLink key={issue.id} href={issue.html_url} target="_blank">
          <div>{issue.title}</div>
        </MuiLink>
      ))}
      {issues.length === 0 && <Typography>No issues found</Typography>}
      <div className={classes.actions}>
        <Link href="/contribution/issues/create">
          <Button className={classes.action} variant="contained">
            Create Issue
          </Button>
        </Link>
        <Link href="/contribution/trophies/create">
          <Button variant="contained">Create Trophy</Button>
        </Link>
      </div>
    </div>
  );
};

ContributionPage.getInitialProps = async () => {
  const issues = await getIssues().then(({ data }) => data);

  return { issues };
};

export default ContributionPage;
