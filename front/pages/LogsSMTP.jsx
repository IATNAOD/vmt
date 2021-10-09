import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsSMTPComponent from '../components/LogsSMTP';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allSMTP}</title></Helmet>
      <LogsSMTPComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};