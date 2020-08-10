import axios from 'axios';

export async function fetchLatestNews() {
  if (typeof window === 'undefined') {
    return { data: null };
  }

  return await axios({
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': process.env.NEWS_API_KEY,
      'x-bingapis-sdk': 'true',
      useQueryString: true,
    },
    params: {
      mkt: 'en-US',
      safeSearch: 'Off',
      setLang: 'EN',
      textFormat: 'Raw',
      category: JSON.parse(window.localStorage.getItem('settings'))?.category,
    },
  }).catch((error) => {
    console.error(error);
  });
}
