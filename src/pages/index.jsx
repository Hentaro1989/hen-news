import React, { useEffect } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchLatestNews } from '../api';
import { isBrowser, useLocalStorage } from '../functions';
import News from '../components/News';
import PullToRefresh from '../components/PullToRefresh';

const useStyles = makeStyles({
  fetchButton: {
    marginTop: '1em',
    marginBottom: '1em',
    display: ({ isMobile }) => (isMobile ? 'none' : 'inline'),
  },
});

export default () => {
  if (!isBrowser) {
    return null;
  }

  const isMobile = useMediaQuery('(max-width: 1280px)');
  const classes = useStyles({ isMobile: isMobile });
  const [articles, setArticles] = useLocalStorage('news', []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  async function fetchNews() {
    const { data } = await fetchLatestNews();

    if (data) {
      setArticles(data.value);
    }
  }

  useEffect(() => {
    if (articles.length === 0) {
      (async () => {
        const { data } = await fetchLatestNews();
        if (data) {
          setArticles(data.value);
        }
      })();
    }
  }, [articles, setArticles]);

  return (
    <PullToRefresh onPull={fetchNews}>
      <Button className={classes.fetchButton} variant="contained" onClick={fetchNews} color="primary">
        Fetch News
      </Button>
      <News articles={articles} favorites={favorites} setFavorites={setFavorites} />
    </PullToRefresh>
  );
};
