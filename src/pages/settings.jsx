import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { Category as CategoryIcon } from '@material-ui/icons';
import { graphql } from 'gatsby';
import FullscreenList from '../components/FullscreenList';
import { isBrowser } from '../functions';

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
  const [selectedCategory, setSelectedCategory] = useState(
    JSON.parse(localStorage.getItem('settings') || '{}')?.category
  );

  const saveCategory = (value) => {
    if (value === 'All') {
      value = undefined;
    }

    setSelectedCategory(value);

    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    settings.category = value;
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  return (
    <>
      <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
        <ListItem button divider onClick={() => setIsOpen(true)}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" secondary={selectedCategory} />
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
