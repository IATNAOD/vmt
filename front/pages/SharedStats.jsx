import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import SharedStatsComponent from '../components/SharedStats';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allSharedStats}</title></Helmet>
      <SharedStatsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};