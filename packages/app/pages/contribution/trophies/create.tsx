import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Link as MuiLink,
  FormHelperText,
  Snackbar
} from '@material-ui/core';
import getGameIconsSvgPath from 'utilities/th-api/game-icons';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import TrophyProgress from 'components/TrophyProgress';
import { createTrophyProposal } from 'utilities/octokit';
import MonacoEditor, { ScriptLoad } from 'components/MonacoEditor';

interface CreateTrophyPageProps {
  trophies: Trophy[];
}

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

const newTrophy: Trophy = {
  name: '',
  title: '',
  author: '',
  description: '',
  attributes: [],
  src: '',
  svgPath: '',
  checkString: `const check: Check = ({ playerStats, avgStats, maxStats, minStats }) => {
  return true;
}
`
};

const CreateTrophyPage: NextFunctionComponent<CreateTrophyPageProps> = ({ trophies }) => {
  const classes = useStyles();
  const [trophy, setTrophy] = useState<Trophy>(newTrophy);
  const [checkString, setCheckString] = useState(newTrophy.checkString);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
      createTrophyProposal({ ...trophy, checkString }).then(() => {
        setLoading(false);
        setTrophy(newTrophy);
        setSuccess(true);
      });
    }
  };

  const handleTextChange = (key: string) => (event: any) => {
    setTrophy({ ...trophy, [key]: event.target.value });
  };

  const handleSrcChange = (event: any) => {
    const src = event.target.value;
    setTrophy({ ...trophy, src });
    if (src.startsWith('https://game-icons.net/')) {
      getGameIconsSvgPath({ url: src })
        .then(svgPath => {
          setTrophy({ ...trophy, src, svgPath });
        })
        .catch(() => {
          setTrophy({ ...trophy, src, svgPath: '' });
        });
    }
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const trophyName = event.target.value;
    const templateTrophy = trophies.find(trophy => trophy.name === trophyName);
    if (templateTrophy) {
      setTrophy(templateTrophy);
      setCheckString(templateTrophy.checkString);
    }
  };

  const handleCodeChange = (value: string) => {
    setCheckString(value);
  };

  const handleClose = (_event: React.SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  return (
    <>
      <ScriptLoad />
      <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
        <div className={classes.form}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="template">Trophy Template</InputLabel>
            <Select
              value={''}
              onChange={handleTemplateChange}
              inputProps={{
                id: 'template'
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {trophies
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(trophy => (
                  <MenuItem key={trophy.name} value={trophy.name}>
                    {trophy.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            id="title"
            label="Title"
            value={trophy.title}
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
            value={trophy.description}
            onChange={handleTextChange('description')}
            margin="normal"
            fullWidth
            placeholder="Boost yourself at least five times"
            helperText="Describe what the player has to do to achieve this trophy"
            required
          />
          <TextField
            id="author"
            label="Author"
            value={trophy.author}
            onChange={handleTextChange('author')}
            margin="normal"
            fullWidth
            placeholder="Jon Doe"
            helperText="What is your name?"
          />
          <TextField
            id="gameIconUrl"
            label="Game Icon URL"
            value={trophy.src}
            onChange={handleSrcChange}
            margin="normal"
            fullWidth
            placeholder="https://game-icons.net/1x1/lorc/syringe.html"
            helperText={
              <span>
                Paste the url of an icon from{' '}
                <MuiLink href="https://game-icons.net/" target="_blank">
                  https://game-icons.net/
                </MuiLink>
              </span>
            }
            required
          />
          <FormControl margin="normal" fullWidth>
            <FormLabel>Check function</FormLabel>
            <FormHelperText>
              Write the check function in TypeScript. If you have no idea what to do, leave this
              field like it is.
            </FormHelperText>
            <MonacoEditor
              className={classes.editor}
              onChange={handleCodeChange}
              language="typescript"
              value={checkString}
              theme="vs-dark"
              minimap={{
                enabled: false
              }}
            />
          </FormControl>
        </div>
        <Divider />

        <FormControl margin="normal">
          <FormLabel>Preview</FormLabel>
        </FormControl>
        <div className={classes.actions}>
          <TrophyProgress trophy={trophy} achieved={true} />
          <div className={classes.grow} />
          <Button type="submit" disabled={loading}>
            Submit Trophy Proposal
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={success}
        onClose={handleClose}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">Thank you for your Trophy proposal</span>}
      />
    </>
  );
};

CreateTrophyPage.getInitialProps = async () => {
  const trophies = await getTrophies();

  return { trophies };
};

export default CreateTrophyPage;
