import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import ProfileComponent from '../components/Profile';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.profile}</title></Helmet>
      <ProfileComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};