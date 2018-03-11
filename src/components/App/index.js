import React from 'react';

import { MuiThemeProvider } from 'material-ui';

import './App.css';
import Dashboard from '../Dashboard';
import Login from '../Login';

class App extends React.Component {
  constructor(props) {
    super(props);

    const accesstokenExpiry = Number(localStorage.getItem('accessTokenExpiry'));
    const isAccessTokenValid = !isNaN(accesstokenExpiry) && accesstokenExpiry > Date.now();

    this.state = {
      isLoggedIn: isAccessTokenValid,
      accessToken: '',
    };

    window.FB.init({
      appId: '183612705722560',
      cookie: true,
      xfbml: true,
      version: 'v2.12',
    });
  }

  componentDidMount = () => {
    window.FB.AppEvents.logPageView();
    window.FB.Event.subscribe('auth.statusChange', (response) => {
      if (response.authResponse) {
        this.checkLoginState();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
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

  statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      const headers = new Headers();
      headers.append('accesstoken', response.authResponse.accessToken);

      fetch('/api/users/login', {
        method: 'POST',
        headers,
      }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem('accessToken', response.authResponse.accessToken);
          localStorage.setItem('accessTokenExpiry', new Date().setHours(new Date().getHours() + 1));
          this.setState(prevState => ({
            ...prevState,
            isLoggedIn: true,
            accessToken: response.authResponse.accessToken,
          }));
        } else {
          this.setState({
            isLoggedIn: false,
          });
        }
      });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      this.setState({
        isLoggedIn: false,
      });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  checkLoginState = () => {
    window.FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  changeLoginState = (value) => {
    this.setState(prevState => ({
      ...prevState,
      isLoggedIn: value,
    }));
  }

  fbLoginClickHandler = () => {
    window.FB.login(this.checkLoginState(), { scope: 'public_profile,email,user_friends' });
  }

  render = () => (
    <MuiThemeProvider >
      <div className="App">
        {this.state.isLoggedIn ?
          <Dashboard
            changeLoginState={value => this.changeLoginState(value)}
            accessToken={this.state.accessToken}
          />
          :
          <Login
            changeLoginState={value => this.changeLoginState(value)}
            fbLoginClick={() => this.fbLoginClickHandler()}
          />
        }
      </div>
    </MuiThemeProvider>
  );
}

export default App;
