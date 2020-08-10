import React, { useState } from 'react';
import { Button, Grid, Card, CardContent, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchLatestNews } from '../api';
import { isBrowser } from '../functions';

const useStyles = makeStyles(() => ({
  card: {
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
}));

export default () => {
  if (!isBrowser) {
    return null;
  }

  const classes = useStyles();
  const [articles, setArticles] = useState(JSON.parse(localStorage.getItem('news')) || []);

  return (
    <>
      <div style={{ textAlign: 'center', padding: '1em' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const { data } = await fetchLatestNews();

            if (data) {
              window.localStorage.setItem('news', JSON.stringify(data.value));
              setArticles(data.value);
            }
          }}
        >
          fetch manually
        </Button>
      </div>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
