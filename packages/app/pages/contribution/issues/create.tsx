import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import { makeStyles } from '@material-ui/styles';
import { TextField, Button, Divider } from '@material-ui/core';
import { createIssue } from 'utilities/octokit';
import { Issue } from 'utilities/octokit/interface';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2)
  },
  form: {
    overflow: 'auto',
    flex: 1
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  attributes: {},
  grow: {
    flex: 1
  },
  editor: {
    height: 200,
    marginTop: theme.spacing(2)
  }
}));

const newIssue: Issue = {
  title: '',
  author: '',
  description: ''
};

const CreateIssuePage: NextFunctionComponent = () => {
  const classes = useStyles();
  const [issue, setIssue] = useState<Issue>(newIssue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!loading) {
      setLoading(true);
      createIssue(issue).then(() => {
        setLoading(false);
        setIssue(newIssue);
      });
    }
  };

  const handleTextChange = (key: string) => (event: any) => {
    setIssue({ ...issue, [key]: event.target.value });
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.form}>
          <TextField
            id="title"
            label="Title"
            value={issue.title}
            onChange={handleTextChange('title')}
            margin="normal"
            fullWidth
            placeholder="Addicted"
            helperText="Select a meaningful title"
            required
          />
          <TextField
            id="description"
            label="Description"
            value={issue.description}
            onChange={handleTextChange('description')}
            margin="normal"
            fullWidth
            multiline
            helperText="Describe your issue with all informations required for reconstruction"
            required
          />
          <TextField
            id="author"
            label="Author"
            value={issue.author}
            onChange={handleTextChange('author')}
            margin="normal"
            fullWidth
            placeholder="Jon Doe"
            helperText="What is your name?"
          />
        </div>
        <Divider />
        <div className={classes.actions}>
          <div className={classes.grow} />
          <Button onClick={handleSubmit} disabled={loading}>
            Submit Issue
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateIssuePage;
