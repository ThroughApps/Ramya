import React from 'react';
import { withLastLocation } from 'react-router-last-location';
import { GetEmployeeSite,GetCurrentSite, GetSiteDetails, GetCurrencies,SetCurrentPage } from './ConstSiteFunction';

const About = ({ lastLocation }) => (
  <div>
    <img src="https://media.giphy.com/media/3ov9jZ4ZMhZJs9mKBO/giphy.gif" />
    <h1>About!</h1>
    <h2>Your last location</h2>
    <pre>
      {JSON.stringify(lastLocation, undefined, 2)}
    </pre>
  </div>
);

export default withLastLocation(About);
