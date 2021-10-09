import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsCardsComponent from '../components/LogsCards';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allCards}</title></Helmet>
      <LogsCardsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};