import React from 'react';
import { Route, Switch, withRouter } from 'react-router';

import { signUpAuth } from '../../Auth';

import Container from '../Container';
import Login from '../Login';
import Loading from '../Loading';

import './App.css';

class App extends React.Component {
  handleAuthentication = () => {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      signUpAuth.handleAuthentication(this.props.history);
    }
  };

  render = () => (
    <Switch>
      <Route
        path="/login"
        component={Login}
      />
      <Route
        path="/callback"
        render={() => {
          this.handleAuthentication();
          return <Loading />;
        }}
      />
      <Route
        path="*"
        component={Container}
      />
    </Switch>
  );
}

export default withRouter(App);
