import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import SettingsComponent from '../components/Settings';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.settings}</title></Helmet>
      <SettingsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};