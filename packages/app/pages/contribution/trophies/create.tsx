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
  Checkbox
} from '@material-ui/core';

interface CreateTrophyPageProps {
  attributes: Attributes;
}

interface TrophyProposal {
  title: string;
  description: string;
  attributes: {
    [attributeName: string]: boolean;
  };
  svgPath: string;
  gameIconUrl: string;
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
  }
}));

const CreateTrophyPage: NextFunctionComponent<CreateTrophyPageProps> = ({ attributes }) => {
  const newTrophy: TrophyProposal = {
    title: '',
    description: '',
    attributes: attributes.reduce(
      (attributes, attribute) => ({ ...attributes, [attribute.key]: false }),
      {}
    ),
    svgPath: '',
    gameIconUrl: ''
  };
  const classes = useStyles();
  const [trophy, setTrophy] = useState<TrophyProposal>(newTrophy);

  const handleSubmit = () => {};

  const handleTextChange = (key: string) => (event: any) => {
    setTrophy({ ...trophy, [key]: event.target.value });
  };

  const handleAttributeChange = (name: string) => (event: any) => {
    setTrophy({ ...trophy, attributes: { ...trophy.attributes, [name]: event.target.checked } });
  };

  const handleGameIconUrlChange = (event: any) => {
    setTrophy({ ...trophy, gameIconUrl: event.target.value });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
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
          id="gameIconUrl"
          label="Game Icon URL"
          value={trophy.gameIconUrl}
          onChange={handleGameIconUrlChange}
          margin="normal"
        />
        <FormControl margin="normal">
          <FormLabel>Related attributes</FormLabel>
          <FormGroup>
            {attributes.map(attribute => (
              <FormControlLabel
                key={attribute.key}
                control={
                  <Checkbox
                    checked={trophy.attributes[attribute.key]}
                    onChange={handleAttributeChange(attribute.key)}
                    value={attribute.key}
                  />
                }
                label={attribute.title}
              />
            ))}
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};

CreateTrophyPage.getInitialProps = async () => {
  const attributes = await getAttributes();
  return { attributes };
};

export default CreateTrophyPage;
