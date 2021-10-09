import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import AllWorkersComponent from '../components/AllWorkers';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allWorkers}</title></Helmet>
      <AllWorkersComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};