import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import jdenticon from 'jdenticon';
import React, { FunctionComponent } from 'react';

interface ProfilePictureProps {
  name: string;
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#1a334dff'
  }
});

jdenticon.config = {
  lightness: {
    color: [0.46, 0.8],
    grayscale: [0.81, 0.81]
  },
  saturation: {
    color: 1.0,
    grayscale: 0.0
  },
  backColor: '#1a334dff'
};

const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ name }) => {
  const classes = useStyles({});
  const svg = jdenticon.toSvg(name, 32);

  return <Avatar className={classes.avatar} alt={name} dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default ProfilePicture;
