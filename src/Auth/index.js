import auth0 from 'auth0-js';
import { app } from '../lib/constants';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'sauravsahu.auth0.com',
    clientID: 'TF5Sv1SO5dFnKd7OMb7bTykdiWzovGeS',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://sauravsahu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication(history) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, history);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        // console.log(err);
      }
    });
  }

  setSession = (authResult, history) => {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    sessionStorage.setItem(app.accessToken, authResult.accessToken);
    sessionStorage.setItem(app.idToken, authResult.idToken);
    sessionStorage.setItem(app.expiresAt, expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  logout = (history) => {
    // Clear Access Token and ID Token from local storage
    sessionStorage.removeItem(app.accessToken);
    sessionStorage.removeItem(app.idToken);
    sessionStorage.removeItem(app.expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticate = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(sessionStorage.getItem(app.expiresAt));
    return new Date().getTime() < expiresAt;
  }

  userInfo = async () => new Promise((resolve, reject) => {
    const accessToken = sessionStorage.getItem(app.accessToken);
    this.auth0.client.userInfo(accessToken, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}
