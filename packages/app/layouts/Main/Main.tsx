import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import SubDrawer from 'components/SubDrawer';

interface MainProps {
  drawerContent: React.ReactNode;
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex'
  }
});

const Main: FunctionComponent<MainProps> = ({ children, drawerContent }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SubDrawer>{drawerContent}</SubDrawer>
      {children}
    </div>
  );
};

export default Main;
