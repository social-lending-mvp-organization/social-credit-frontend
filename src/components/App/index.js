import React from 'react';

import { MuiThemeProvider } from 'material-ui';

import './App.css';
import Dashboard from '../Dashboard';
import Login from '../Login';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  getTitleBar = () => {
    const secondaryText = this.state.isLoggedIn ? 'Welcome back' : '';
    return (
      <div>
        <span>Social Credit</span>
        {secondaryText}
      </div>
    );
  }

  fbLoginClickHandler = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    });
  }

  render = () => (
    <MuiThemeProvider >

      <div className="App">
        {this.state.isLoggedIn ?
          <Dashboard
            isLoggedIn={this.state.isLoggedIn}
            accessToken="EAACmZCqoZA0MABAISnJuNeqyBwE5gskM2l68juDZAPgvBo5BUgU9y8gIGk90oKdRWFBT42yJgh2PiJGLlIUyDnYFhGN8caLOKzcz1E2ubQj18eirB7R9FVlLhWkAojithS61Iia6TBSKtRDrIDfRZBSxeduQEU2Alslbf151wfcp91G40IwB4FZCpl5dTsHC9AbkczMlWJgZDZD"
          />
          :
          <Login />
        }
      </div>
    </MuiThemeProvider>
  );
}

export default App;
