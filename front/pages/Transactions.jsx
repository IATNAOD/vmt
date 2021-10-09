import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import TransactionsComponent from '../components/Transactions';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.transactions}</title></Helmet>
      <TransactionsComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};