import React, { useState } from 'react';
import { navigate, useStaticQuery, graphql } from 'gatsby';
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

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          bottomNavigationLabels
        }
      }
    }
  `);

  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            {siteMetadata.title}
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
        <BottomNavigationAction label={siteMetadata.bottomNavigationLabels[0]} value="/" icon={<Timeline />} />
        <BottomNavigationAction label={siteMetadata.bottomNavigationLabels[1]} value="/favorites" icon={<Favorite />} />
        <BottomNavigationAction label={siteMetadata.bottomNavigationLabels[2]} value="/settings" icon={<Settings />} />
      </BottomNavigation>
    </>
  );
};
