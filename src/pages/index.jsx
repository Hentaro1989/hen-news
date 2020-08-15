import React, { useEffect } from 'react';
import { fetchLatestNews } from '../api';
import { isBrowser, useLocalStorage } from '../functions';
import News from '../components/News';
import PullToRefresh from '../components/PullToRefresh';

export default () => {
  if (!isBrowser) {
    return null;
  }

  const [articles, setArticles] = useLocalStorage('news', []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  async function onPull() {
    const { data } = await fetchLatestNews();

    if (data) {
      setArticles(data.value);
    }
  }

  useEffect(() => {
    if (articles.length === 0) {
      (async () => {
        const { data } = await fetchLatestNews();
        setArticles(data.value);
      })();
    }
  }, [articles, setArticles]);

  return (
    <PullToRefresh onPull={onPull}>
      <News articles={articles} favorites={favorites} setFavorites={setFavorites} />
    </PullToRefresh>
  );
};
