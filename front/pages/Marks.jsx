import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import MarksComponent from '../components/Marks';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.marks}</title></Helmet>
      <MarksComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};