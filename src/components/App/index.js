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

  fetchData = (url, options) => {
    fetch(url, options)
      .then(response => response.text())
      .then(response => JSON.parse(response))
      .then(console.log);
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
          console.log(res);
          this.setState({
            isLoggedIn: true,
          });
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
            accessToken="EAACmZCqoZA0MABAISnJuNeqyBwE5gskM2l68juDZAPgvBo5BUgU9y8gIGk90oKdRWFBT42yJgh2PiJGLlIUyDnYFhGN8caLOKzcz1E2ubQj18eirB7R9FVlLhWkAojithS61Iia6TBSKtRDrIDfRZBSxeduQEU2Alslbf151wfcp91G40IwB4FZCpl5dTsHC9AbkczMlWJgZDZD"
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
