import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import './App.css';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Loading from '../Loading';
import Auth from '../../Auth';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(nextState.history);
  }
};

class App extends React.Component {
  getTitleBar = () => {
    const secondaryText = this.state.isLoggedIn ? 'Welcome back' : '';
    return (
      <div>
        <span>Social Credit</span>
        {secondaryText}
      </div>
    );
  }

  render = () => (
    // First banner page
    <Switch>
      {/* <Route path="/" exact render={props => <App auth={auth} {...props} />} /> */}
      <Route path="/" exact render={props => <Dashboard auth={auth} {...props} />} />
      <Route path="/login" render={props => <Login auth={auth} {...props} />} />
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props);
          return <Loading {...props} />;
        }}
      />
    </Switch>
  );
}

export default withRouter(App);
