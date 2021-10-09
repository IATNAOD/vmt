import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsWordPressComponent from '../components/LogsWordPress';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allWordpress}</title></Helmet>
      <LogsWordPressComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};