import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { Category as CategoryIcon } from '@material-ui/icons';
import { graphql } from 'gatsby';
import FullscreenList from '../components/FullscreenList';
import { isBrowser, useLocalStorage } from '../functions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ({
  data: {
    site: { siteMetadata },
  },
}) => {
  if (!isBrowser) {
    return null;
  }

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useLocalStorage('settings', {});
  const [, setLastFetchedAt] = useLocalStorage('lastFetchedAt');

  const saveCategory = (value) => {
    const newSettings = { ...settings };
    if (value === 'All') {
      value = undefined;
    }

    setLastFetchedAt(undefined);

    newSettings.category = value;
    setSettings(newSettings);
  };

  return (
    <>
      <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
        <ListItem button divider onClick={() => setIsOpen(true)}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" secondary={settings.category} />
        </ListItem>
      </List>
      <FullscreenList
        openState={[isOpen, setIsOpen]}
        setValue={saveCategory}
        list={siteMetadata.newsCategories}
        appBarLabel={siteMetadata.newsCategoryTitle}
      />
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        newsCategories
        newsCategoryTitle
      }
    }
  }
`;
