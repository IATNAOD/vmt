import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsCpanelsComponent from '../components/LogsCpanels';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allCpanels}</title></Helmet>
      <LogsCpanelsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};