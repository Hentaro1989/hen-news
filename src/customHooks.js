import { useState, useEffect } from 'react';

/**
 * Since Gatsby can't read browser globals in "gatsby build" command,
 * get window with useEffect (it doesn't run in "gatsby build" command)
 */
export const useWindow = () => {
  const [win, setWin] = useState({});

  useEffect(() => {
    setWin(window);
  }, []);

  return win;
};
