import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './Components/Login/Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MuiThemeProvider>
    <Login />
  </MuiThemeProvider>
  , document.getElementById('root'),
);
registerServiceWorker();
