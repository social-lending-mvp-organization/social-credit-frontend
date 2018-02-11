import React from 'react';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

// import logo from './media/logo.svg';
/* global FB */
import './css/App.css';
import Login from './Login';
import Dashboard from './Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.fbLoginClickHandler = this.fbLoginClickHandler.bind(this);
    this.fbLogoutClickHandler = this.fbLogoutClickHandler.bind(this);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    // Loading Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: 'AppID',
        cookie: true,
        xfbml: true,
        version: 'v2.12',
      });
      // Subscribing for statusChange from SDK
      FB.AppEvents.logPageView();
      FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }.bind(this);

    // Load the SDK asynchronously
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  getTitleBar() {
    const secondaryText = this.state.isLoggedIn ? 'Welcome back' : '';
    return (
      <Grid>
        <PageHeader>
          <Row className="show-grid">
            <Col xs={4} md={4} >
              <span>Social credit</span>
            </Col>
            <Col xs={8} md={8} >
              <small>{secondaryText}</small>
            </Col>
          </Row>
        </PageHeader>
      </Grid>
    );
  }

  getBody() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={8} md={8} >
            <Dashboard isLoggedIn={this.state.isLoggedIn} />
          </Col>
          <Col xs={4} md={4} >
            <Login isLoggedIn={this.state.isLoggedIn} fbLoginClickHandler={this.fbLoginClickHandler} />
          </Col>
        </Row>
      </Grid>
    );
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('userid', response.authResponse.userID);
      console.log('accessToken', response.authResponse.accessToken);
      this.setState({
        isLoggedIn: true,
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

  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  fbLoginClickHandler() {
    FB.login(this.checkLoginState(), { scope: 'public_profile,email,user_friends' });
  }

  fbLogoutClickHandler() {
    FB.logout(this);
  }

  render() {
    return (
      <div className="app-wrapper">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12} >
              {this.getTitleBar()}
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12} >
              {this.getBody()}
            </Col>
          </Row>
        </Grid>
      </div >
    );
  }
}

export default App;
