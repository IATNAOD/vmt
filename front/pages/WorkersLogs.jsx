import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import WorkersLogsComponent from '../components/WorkersLogs';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.workersLogs}</title></Helmet>
      <WorkersLogsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};