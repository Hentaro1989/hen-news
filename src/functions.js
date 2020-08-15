import { useState } from 'react';

export const isBrowser = typeof window !== 'undefined';

function parseData(item) {
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error(e);
    return item;
  }
}

export const useLocalStorage = (key, initialValue) => {
  const data = parseData(localStorage.getItem(key));

  const [state, setState] = useState(data === null ? initialValue : data);

  function setLocalStorage(data) {
    if (data === null || data === undefined || Number.isNaN(data)) {
      localStorage.removeItem(key);
      return;
    }

    setState(data);
    localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
  }

  return [state, setLocalStorage];
};
