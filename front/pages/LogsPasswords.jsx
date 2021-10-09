import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LogsPasswordsComponent from '../components/LogsPasswords';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.allPasswords}</title></Helmet>
      <LogsPasswordsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};