import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import LoaderComponent from '../components/Loader';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.loader}</title></Helmet>
      <LoaderComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};