import React from 'react';
import { getIssues } from 'utilities/octokit';
import { IssuesListForRepoResponseItem } from '@octokit/rest';
import { makeStyles } from '@material-ui/styles';
import { Link as MuiLink, Typography } from '@material-ui/core';
import { NextFunctionComponent } from 'next';
import Link from 'next/link';

interface ContributionPageProps {
  issues: IssuesListForRepoResponseItem[];
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2)
  }
}));

const ContributionPage: NextFunctionComponent<ContributionPageProps> = ({ issues }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="overline">
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
        ,{' '}
        <Link href="/contribution/issues/create">
          <MuiLink>send feedback/report issues</MuiLink>
        </Link>{' '}
        or submit{' '}
        <Link href="/contribution/trophies/create">
          <MuiLink>trophy proposals</MuiLink>
        </Link>
        .
      </Typography>
      <Typography variant="subtitle1">Latest Requests</Typography>
      {issues.map(issue => (
        <MuiLink key={issue.id} href={issue.html_url} target="_blank">
          {issue.title}
        </MuiLink>
      ))}
      {issues.length === 0 && <Typography>No issues found</Typography>}
    </div>
  );
};

ContributionPage.getInitialProps = async () => {
  const issues = await getIssues().then(({ data }) => data);

  return { issues };
};

export default ContributionPage;
