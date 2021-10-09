import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsFilesComponent from '../components/LogsFiles';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allFiles}</title></Helmet>
      <LogsFilesComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};