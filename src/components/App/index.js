import React from 'react';

import { MuiThemeProvider } from 'material-ui';
import AppBar from 'material-ui/AppBar';

import './App.css';
import Dashboard from '../Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
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
        <AppBar
          title="Social-Credit"
          showMenuIconButton={false}
        />
        {this.state.isLoggedIn ?
          <Dashboard
            isLoggedIn={this.state.isLoggedIn}
            accessToken
          />
          :
          {/* Login Component */}
        }
      </div>
    </MuiThemeProvider>
  );
}

export default App;
