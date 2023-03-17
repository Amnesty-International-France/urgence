import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import settings from './settings'

const App = () => (
  <Admin dataProvider={dataProvider('/api')}>
    <Resource {...settings} />
  </Admin>
);

export default App;
