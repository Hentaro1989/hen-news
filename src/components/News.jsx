import React from 'react';
import { Grid, Card, CardContent, CardActionArea, CardMedia, Typography, IconButton } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { isBrowser } from '../functions';

const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
    minHeight: '220px',
  },
  content: {
    display: 'flex',
  },
  title: {
    margin: 'auto 0.5em',
  },
  caption: {
    overflow: 'hidden',
    marginTop: '1em',
    textOverflow: 'ellipsis',
  },
  media: {
    minHeight: '100px',
    height: '100px',
    minWidth: '100px',
    width: '100px',
  },
  favorite: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

export default ({ articles, favorites, setFavorites }) => {
  const classes = useStyles();

  if (!isBrowser) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {articles.map((article, i) => (
        <Grid item xs={12} md={6} lg={4} key={i}>
          <Card className={classes.card}>
            <CardActionArea className={classes.card} onClick={() => window.open(article.url, '_blank')}>
              <CardContent>
                <div className={classes.content}>
                  <CardMedia className={classes.media} image={article.image.thumbnail.contentUrl} />
                  <Typography className={classes.title} component="h6" variant="body1">
                    {article.name}
                  </Typography>
                </div>
                <Typography className={classes.caption} component="div" variant="caption">
                  {article.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <IconButton
              className={classes.favorite}
              onClick={() => {
                const newFavorites = [...favorites];
                const index = favorites.findIndex((fav) => fav.url === article.url);
                if (index === -1) {
                  newFavorites.unshift(article);
                } else {
                  newFavorites.splice(index, 1);
                }
                setFavorites(newFavorites);
              }}
            >
              <Favorite style={{ color: favorites.some((fav) => fav.url === article.url) ? pink[300] : undefined }} />
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
