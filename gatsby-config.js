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
    bottomNavLabels: ['Timeline', 'Favorites', 'Settings'],
    newsCategoryTitle: 'Category',
    newsCategories: [
      'All',
      'Business',
      'Entertainment',
      'Entertainment_MovieAndTV',
      'Entertainment_Music',
      'Health',
      'Politics',
      'Products',
      'ScienceAndTechnology',
      'Technology',
      'Science',
      'Sports',
      'Sports_Golf',
      'Sports_MLB',
      'Sports_NBA',
      'Sports_NFL',
      'Sports_NHL',
      'Sports_Soccer',
      'Sports_Tennis',
      'Sports_CFB',
      'Sports_CBB',
      'US',
      'US_Northeast',
      'US_South',
      'US_Midwest',
      'US_West',
      'World',
      'World_Africa',
      'World_Americas',
      'World_Asia',
      'World_Europe',
      'World_MiddleEast',
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'News',
        short_name: 'News',
        start_url: '/',
        background_color: '#42a5f5',
        theme_color: '#42a5f5',
        display: 'standalone',
        icon: `src/images/news.png`,
      },
    },
    'gatsby-plugin-offline',
  ],
};
