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
      socialGraph: undefined,
    };
  }

  login = async () => {
    if (!this.state.loaded) {
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
  }

  payEmi = () => new Promise(async (resolve) => {
    const remainingLoans = this.state.loans.filter(l => l.outstandingAmount > 0);
    if (remainingLoans.length === 1) {
      const loan = remainingLoans[0];

      const headers = new Headers();
      headers.append(app.accessToken, sessionStorage.getItem(app.apiToken));

      const response = await fetchHelper('/api/users/emi', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          amount: loan.outstandingAmount / loan.outstandingInstallments,
        }),
      });

      if (response.statusCode === 201) {
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
        }), () => { resolve('Paid the installment successfully.'); });
      }
    }
  });

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
          connections: { facebook: userProfile },
          loaded: true,
        }), () => {
          // const twitterFollowers = await fetchHelper(
          // `/api/users/twitterGraph?screenName=${this.state.user.breakDown.twitter.screenName}`);
          // this.setState(prevState => ({
          //   ...prevState,
          //   socialGraph: twitterFollowers,
          // }));
        });
      });
    });
  }

  applyForLoan = newLoan => new Promise(async (resolve, reject) => {
    const loansLeftToPayback = this.state.loans
      .filter(l => l.outstandingInstallments > 0).length;

    if (loansLeftToPayback > 0) {
      reject(new Error('You have to pay back your loan first.'));
    }

    const headers = new Headers();
    headers.append(app.accessToken, sessionStorage.getItem(app.apiToken));

    const response = await fetchHelper('/api/users/loans', {
      method: 'POST',
      headers,
      body: JSON.stringify(newLoan),
    });

    if (response.statusCode === 201) {
      this.setState(prevState => ({
        ...prevState,
        loans: [...prevState.loans, response.data],
      }), () => {
        resolve('Your loan has been approved.');
      });
    }
    resolve('Loan request failed.');
  });

  render = () => (
    <Switch>
      <Route
        path="/"
        exact
        render={props => (
          <Dashboard
            user={this.state.user}
            connections={this.state.connections}
            loans={this.state.loans}
            style={styles.main}
            login={async () => { await this.login(); }}
            retrieveProfile={async () => { await this.retrieveProfile(); }}
            applyForLoan={async (amount, installments) => {
              await this.applyForLoan({
                totalAmount: amount,
                totalInstallments: installments,
              });
            }}
            payEmi={async () => {
              await this.payEmi();
            }}
            socialGraph={this.state.socialGraph}
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
        path="*"
        render={props => (
          // <NotFound
          //   user={this.state.user}
          //   connections={this.state.connections}
          //   retrieveProfile={async () => { await this.retrieveProfile(); }}
          //   {...props}
          // />
          <div>Not found</div>
        )}
      />
    </Switch>
  );
}

Container.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
};

export default withRouter(Container);
