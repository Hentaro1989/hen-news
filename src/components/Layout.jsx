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
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Timeline, Favorite, Settings } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '64px',
    marginBottom: '56px',
  },
  bottom: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    justifyContent: 'space-evenly',
  },
}));

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#42a5f5',
      light: '#80d6ff',
      dark: '#0077c2',
      contrastText: '#000',
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default ({ path: previousPath, children }) => {
  const classes = useStyles();
  const [currentPath, setCurrentPath] = useState(previousPath);

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          bottomNavLabels
        }
      }
    }
  `);

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {siteMetadata.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.container}>{children}</Container>
        <BottomNavigation
          value={currentPath}
          onChange={(event, path) => {
            setCurrentPath(path);
            navigate(path, { replace: true });
          }}
          showLabels
          className={classes.bottom}
        >
          <BottomNavigationAction label={siteMetadata.bottomNavLabels[0]} value="/" icon={<Timeline />} />
          <BottomNavigationAction label={siteMetadata.bottomNavLabels[1]} value="/favorites/" icon={<Favorite />} />
          <BottomNavigationAction label={siteMetadata.bottomNavLabels[2]} value="/settings/" icon={<Settings />} />
        </BottomNavigation>
      </ThemeProvider>
    </>
  );
};
