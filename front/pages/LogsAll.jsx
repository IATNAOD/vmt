import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsAllComponent from '../components/LogsAll';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allLogs}</title></Helmet>
      <LogsAllComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};