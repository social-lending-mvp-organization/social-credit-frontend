import React from 'react';
import { Route, Switch, withRouter } from 'react-router';

import { signUpAuth, connectionsAuth } from '../../Auth';
import { fetchHelper } from '../../lib/fetch-helper';
import { app } from '../../lib/constants';

import Container from '../Container';
import Login from '../Login';
import Loading from '../Loading';

import './App.css';
import { access } from 'fs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => (
    <Switch>
      <Route
        path="/login"
        component={Login}
      />
      <Route
        path="/new-user"
        render={() => (
          <Loading callback={() => {
            if (/access_token|id_token|error/.test(this.props.location.hash)) {
              signUpAuth.handleAuthentication(this.props.history);
            }
          }}
          />
        )}
      />
      <Route
        path="/new-provider"
        render={() => (
          <Loading callback={async () => {
            if (/access_token|id_token|error/.test(this.props.location.hash)) {
              const providerAccessToken = await connectionsAuth.getAccessToken();

              const headers = new Headers();
              headers.append(app.accessToken, sessionStorage.getItem(app.apiToken));

              const connect = await fetchHelper('/api/users/connect', {
                method: 'POST',
                headers,
                body: JSON.stringify({ providerAccessToken }),
              });

              this.props.history.replace('/');
            }
          }}
          />
        )}
      />
      <Route
        path="*"
        component={Container}
      />
    </Switch>
  );
}

export default withRouter(App);
