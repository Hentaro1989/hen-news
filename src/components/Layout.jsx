import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Header from '../components/Header';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Timeline, Favorite, Settings } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '48px',
    marginBottom: '56px',
  },
  bottom: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    justifyContent: 'space-evenly',
  },
}));

export default ({ children }) => {
  const classes = useStyles();
  const [path, setPath] = useState('/');

  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>{children}</Container>
      <BottomNavigation
        value={path}
        onChange={(event, path) => {
          setPath(path);
          navigate(path);
        }}
        showLabels
        className={classes.bottom}
      >
        <BottomNavigationAction label="Timeline" value="/" icon={<Timeline />} />
        <BottomNavigationAction label="Favorite" value="/saved" icon={<Favorite />} />
        <BottomNavigationAction label="Settings" value="/settings" icon={<Settings />} />
      </BottomNavigation>
    </>
  );
};
