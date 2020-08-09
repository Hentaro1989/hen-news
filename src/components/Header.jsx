import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description}></meta>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Helmet>
  );
};
