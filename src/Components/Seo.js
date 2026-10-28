import React from 'react';
import { Helmet } from 'react-helmet';

const DEFAULT_TITLE = 'Emran: ExxonMobil Retirees Association of Nigeria';
const DEFAULT_DESCRIPTION = 'A Congregation of ExxonMobil Retirees; Former staff members of exxonmobil in Nigeria who come together for welfare, association and common interests.';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/dtthdh8tb/image/upload/v1771325816/exxonmobil-logo-white_gnjhso.jpg';
const PREFERRED_DOMAIN = 'https://emran.center';

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
  canonical,
  noindex = false,
  nofollow = false,
  ogType = 'website',
}) => {
  const canonicalUrl = canonical || `${PREFERRED_DOMAIN}/`;
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | Emran`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={canonicalUrl} />
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}
        />
      )}
    </Helmet>
  );
};

export default Seo;