import React, { useState } from 'react';
import { NextFunctionComponent } from 'next';
import { makeStyles } from '@material-ui/styles';
import getAttributes, { Attributes } from 'utilities/th-api/attributes';
import {
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import getGameIconsSvgPath from 'utilities/th-api/game-icons';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import MatchTrophy from 'components/MatchTrophy';
import getMatch, { Match } from 'utilities/th-api/match';
import octokit from 'utilities/octokit';

interface CreateTrophyPageProps {
  attributes: Attributes;
  match: Match;
  trophies: Trophy[];
}

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2)
  },
  attributes: {
    overflow: 'auto'
  }
}));

const newTrophy: Trophy = {
  name: '',
  title: '',
  author: '',
  description: '',
  attributes: [],
  src: '',
  svgPath: ''
};

const CreateTrophyPage: NextFunctionComponent<CreateTrophyPageProps> = ({
  attributes,
  match,
  trophies
}) => {
  const classes = useStyles();
  const [trophy, setTrophy] = useState<Trophy>(newTrophy);
  const [selectedAttributes, setSelectedAttributes] = useState<any>(
    attributes.reduce((attributes, attribute) => ({ ...attributes, [attribute.key]: false }), {})
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!loading) {
      setLoading(true);
      octokit.issues
        .create({
          owner: 'lmachens',
          repo: 'trophy-hunter-pubg',
          labels: ['trophy proposal'],
          title: `[Trophy]: ${trophy.title}`,
          body: `${trophy.author} proposes to create ${trophy.title}:

\`\`\`json
${JSON.stringify(trophy, null, 2)}
\`\`\`
`
        })
        .then(() => {
          setLoading(false);
          setTrophy(newTrophy);
        });
    }
  };

  const handleTextChange = (key: string) => (event: any) => {
    setTrophy({ ...trophy, [key]: event.target.value });
  };

  const handleAttributeChange = (name: any) => (event: any) => {
    setSelectedAttributes({ ...selectedAttributes, [name]: event.target.checked });
    const newTrophy = { ...trophy };
    if (event.target.checked) {
      const attribute = attributes.find(attribute => attribute.key === name);
      if (attribute) {
        newTrophy.attributes.push(attribute);
      }
    } else {
      newTrophy.attributes = newTrophy.attributes.filter(attribute => attribute.key !== name);
    }
    setTrophy(newTrophy);
  };

  const handleSrcChange = (event: any) => {
    const src = event.target.value;
    setTrophy({ ...trophy, src });
    if (src.startsWith('https://game-icons.net/')) {
      getGameIconsSvgPath({ url: src })
        .then(svgPath => {
          setTrophy({ ...trophy, svgPath });
        })
        .catch(() => {
          setTrophy({ ...trophy, svgPath: '' });
        });
    }
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const trophyName = event.target.value;
    const trophy = trophies.find(trophy => trophy.name === trophyName);
    if (trophy) {
      setTrophy(trophy);
      const newSelectedAttributes = { ...selectedAttributes };
      Object.keys(newSelectedAttributes).forEach(attributeKey => {
        newSelectedAttributes[attributeKey] = !!trophy.attributes.find(
          attribute => attribute.key === attributeKey
        );
      });
      setSelectedAttributes(newSelectedAttributes);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <FormControl margin="normal">
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
        />
        <TextField
          id="description"
          label="Description"
          value={trophy.description}
          onChange={handleTextChange('description')}
          margin="normal"
        />
        <TextField
          id="author"
          label="Author"
          value={trophy.author}
          onChange={handleTextChange('author')}
          margin="normal"
        />
        <TextField
          id="gameIconUrl"
          label="Game Icon URL"
          value={trophy.src}
          onChange={handleSrcChange}
          margin="normal"
        />
        <FormControl margin="normal" className={classes.attributes}>
          <FormLabel>Related attributes</FormLabel>
          <FormGroup>
            {attributes
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(attribute => (
                <FormControlLabel
                  key={attribute.key}
                  control={
                    <Checkbox
                      checked={selectedAttributes[attribute.key]}
                      onChange={handleAttributeChange(attribute.key)}
                      value={attribute.key}
                    />
                  }
                  label={attribute.title}
                />
              ))}
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.form}>
        <FormControl margin="normal">
          <FormLabel>Preview</FormLabel>
          <MatchTrophy trophy={trophy} match={match} />
        </FormControl>
        <Button onClick={handleSubmit} disabled={loading}>
          Send Trophy Proposal
        </Button>
      </div>
    </div>
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
