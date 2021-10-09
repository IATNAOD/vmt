import React from 'react';
import languages from '../common/languages';
import { Helmet } from 'react-helmet';

import GrabberComponent from '../components/Grabber';

export default ({
  CurrentLanguage_G
}) => {

  return (
    <div>
      <Helmet><title>VMT - {languages[CurrentLanguage_G].titles.grabber}</title></Helmet>
      <GrabberComponent CurrentLanguage_G={CurrentLanguage_G} />
    </div>
  );

};