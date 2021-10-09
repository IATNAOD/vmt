import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsForDownloadComponent from '../components/LogsForDownload';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allForDownload}</title></Helmet>
      <LogsForDownloadComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};