import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Route, Switch, withRouter } from 'react-router';

import { fetchHelper } from '../../lib/fetch-helper';
import { app } from '../../lib/constants';

import Dashboard from '../Dashboard';
import Connections from '../Connections';
import Navigation from '../Navigation';

import { signUpAuth } from '../../Auth';

import * as styles from './Container.style';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBusy: false,
      message: '',
      user: undefined,
      loans: [],
      connections: [],
      loaded: false,
    };
  }

  login = async () => {
    this.setState(prevState => ({
      ...prevState,
      isBusy: true,
      loaded: false,
      message: 'Logging you in...',
    }), async () => {
      const loginHeaders = new Headers();
      const accessToken = sessionStorage.getItem(app.accessToken);
      loginHeaders.append(app.accessToken, accessToken);

      const loginStatus = await fetchHelper('/api/users/login', {
        headers: loginHeaders,
        method: 'POST',
      });

      if (loginStatus.statusCode !== 200) {
        signUpAuth.logout(this.props.history);
      }

      const { apiToken } = loginStatus;
      sessionStorage.setItem(app.apiToken, apiToken);

      await this.retrieveProfile();
    });
  }

  payEmi = (loan) => {
    this.setState(prevState => ({
      ...prevState,
      loans: prevState.loans.map((p) => {
        if (p !== loan) return p;
        return {
          ...p,
          outstandingInstallments: p.outstandingInstallments - 1,
          outstandingAmount: p.outstandingAmount -
            (p.outstandingAmount / p.outstandingInstallments),
        };
      }),
    }));
  };

  retrieveProfile = async () => {
    this.setState(prevState => ({
      ...prevState,
      loaded: false,
      isBusy: true,
      message: 'Calculating your social score...',
    }), async () => {
      const infoHeaders = new Headers();
      infoHeaders.append(app.accessToken, sessionStorage.getItem(app.apiToken));

      const userDetailsResponse = await fetchHelper('/api/users/info', {
        method: 'GET',
        headers: infoHeaders,
      });

      this.setState(prevState => ({
        ...prevState,
        isBusy: true,
        message: 'Retrieving loan details...',
      }), async () => {
        const userProfile = await signUpAuth.userInfo();

        const loanHeaders = new Headers();
        loanHeaders.append(app.accessToken, sessionStorage.getItem(app.apiToken));
        const loansData = await fetchHelper('/api/users/loans', { headers: loanHeaders });
        this.setState(prevState => ({
          ...prevState,
          isBusy: false,
          loans: loansData.data,
          user: userDetailsResponse.data,
          connections: [userProfile],
          loaded: true,
        }));
      });
    });
  }

  render = () => (
    <div className="Container">
      {this.state.isBusy ? null : <Navigation />}
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Dashboard
              user={this.state.user}
              connections={this.state.connections}
              style={styles.main}
              login={async () => { await this.login(); }}
              retrieveProfile={async () => { await this.retrieveProfile(); }}
              isBusy={{
                value: this.state.isBusy,
                message: this.state.message,
                loaded: this.state.loaded,
              }}
              {...props}
            />
          )}
        />

        <Route
          path="/connections"
          render={props => (
            <Connections
              user={this.state.user}
              connections={this.state.connections}
              retrieveProfile={async () => { await this.retrieveProfile(); }}
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  );
}

Container.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
};

export default withRouter(Container);
