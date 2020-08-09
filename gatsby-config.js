/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Hen News',
    description: 'Latest news in the us is here.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'News',
        short_name: 'News',
        start_url: '/',
        background_color: '#3f51b5',
        theme_color: '#3f51b5',
        display: 'standalone',
        icon: `src/images/news.png`,
      },
    },
    'gatsby-plugin-offline',
  ],
};
