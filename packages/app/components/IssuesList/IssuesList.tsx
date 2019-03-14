import React, { FunctionComponent, useEffect, useState } from 'react';
import octokit from 'utilities/octokit';
import { IssuesListForRepoResponseItem } from '@octokit/rest';
import { makeStyles } from '@material-ui/styles';
import { ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import Link from 'components/Link';

const itemHeight = 46;
const useStyles = makeStyles(theme => ({
  container: {
    overflowY: 'auto',
    flex: 1,
    backgroundColor: theme.palette.background.paper
  },
  item: {
    height: itemHeight
  }
}));

const IssuesList: FunctionComponent = () => {
  const classes = useStyles();

  const [issues, setIssues] = useState<IssuesListForRepoResponseItem[]>([]);
  useEffect(() => {
    octokit.issues
      .listForRepo({
        owner: 'lmachens',
        repo: 'trophy-hunter-pubg'
      })
      .then(({ data }) => {
        setIssues(data);
      });
  });

  return (
    <div className={classes.container}>
      <ListSubheader>Latest</ListSubheader>
      {issues.map(issue => (
        <Link key={issue.id} href={issue.url}>
          <ListItem>
            <ListItemText>{issue.title}</ListItemText>
          </ListItem>
        </Link>
      ))}
      {issues.length === 0 && (
        <ListItem>
          <ListItemText>No issues found</ListItemText>
        </ListItem>
      )}
    </div>
  );
};

export default IssuesList;
