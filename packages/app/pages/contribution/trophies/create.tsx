import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import { makeStyles } from '@material-ui/styles';
import getAttributes, { Attributes } from 'utilities/th-api/attributes';
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
  FormHelperText
} from '@material-ui/core';
import getGameIconsSvgPath from 'utilities/th-api/game-icons';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import MatchTrophy from 'components/MatchTrophy';
import getMatch, { Match } from 'utilities/th-api/match';
import { createTrophyProposal } from 'utilities/octokit';
import MonacoEditor, { ScriptLoad } from 'components/MonacoEditor';

interface CreateTrophyPageProps {
  attributes: Attributes;
  match: Match;
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

const CreateTrophyPage: NextFunctionComponent<CreateTrophyPageProps> = ({ match, trophies }) => {
  const classes = useStyles();
  const [trophy, setTrophy] = useState<Trophy>(newTrophy);
  const [checkString, setCheckString] = useState(newTrophy.checkString);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
      createTrophyProposal({ ...trophy, checkString }).then(() => {
        setLoading(false);
        setTrophy(newTrophy);
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
          <MatchTrophy trophy={trophy} match={match} />
          <div className={classes.grow} />
          <Button type="submit" disabled={loading}>
            Submit Trophy Proposal
          </Button>
        </div>
      </form>
    </>
  );
};

CreateTrophyPage.getInitialProps = async () => {
  const attributesPromise = getAttributes();
  const matchPromise = getMatch({
    platform: 'PC',
    matchId: 'a815b794-5d00-471d-896b-e1fd5e01a38c',
    playerId: 'account.2afdfa3cefad4cdd93217537d40dfd4e'
  });
  const trophiesPromise = getTrophies();
  const [attributes, match, trophies] = await Promise.all([
    attributesPromise,
    matchPromise,
    trophiesPromise
  ]);

  return { attributes, match, trophies };
};

export default CreateTrophyPage;
