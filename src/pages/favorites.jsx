import React from 'react';
import { isBrowser, useLocalStorage } from '../functions';
import News from '../components/News';

export default () => {
  if (!isBrowser) {
    return null;
  }

  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  return <News articles={favorites} favorites={favorites} setFavorites={setFavorites} />;
};
