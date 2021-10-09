import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsStatsComponent from '../components/LogsStats';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allStats}</title></Helmet>
      <LogsStatsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};