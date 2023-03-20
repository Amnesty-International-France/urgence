import * as React from "react";
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import settings from './settings'
import urgentActions from './urgentActions'
import theme from './theme'

const App = () => (
  <Admin dataProvider={dataProvider('/api')} theme={theme}>
    <Resource {...urgentActions} />
    <Resource {...settings} />
  </Admin>
);

export default App;
