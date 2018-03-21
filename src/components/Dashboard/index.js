import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

import fetchHelper from '../../lib/fetch-helper';

import './Dashboard.css';
import * as styles from './Dashboard.style';

import { facebook } from '../../lib/constants';

import ScoreBreakdown from '../ScoreBreakdown';
import LoanHistory from '../LoanHistory';
import NetworkGraph from '../NetworkGraph';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      loans: [],
    };
  }
  componentDidMount = async () => {
    const headers = new Headers();
    const accessToken = localStorage.getItem('accessToken');
    headers.append('accesstoken', accessToken);

    const loginStatus = await fetchHelper('/api/users/login', { headers, method: 'POST' });
    if (loginStatus.statusCode === 200) {
      const userDetailsResponse = await fetchHelper('/api/users/info', { method: 'GET', headers });
      const fetchProfilePictureUrl = `${facebook.profilePicture}&height=240&width=240&access_token=${accessToken}`;
      const profilePictureResponse = await fetchHelper(fetchProfilePictureUrl);
      const loansData = await fetchHelper('/api/users/loans', { headers });
      this.setState(prevState => ({
        ...prevState,
        loans: loansData.data,
        user: userDetailsResponse.data,
        profilePicture: profilePictureResponse.data.url,
      }));
    } else { this.logOut(); }
  };

  logOut = () => {
    window.FB.logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiry');
    this.props.changeLoginState(false);
  };

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
  }

  render = () => (
    (!this.state.user || !this.state.loans) ?
      <div>
        <Dialog
          className="Dashboard-user-data-dialog"
          title="Loading..."
          modal
          open
        >
          <CircularProgress size={80} thickness={5} />
        </Dialog>
      </div>
      :
      <div className="Dashboard">
        <AppBar
          title="Social-Credit"
          showMenuIconButton={false}
          iconElementRight={<FlatButton
            label="Log out"
            onClick={() => this.logOut()}
          />}
        />
        <div className="Dashboard-container">
          <NetworkGraph screenName={this.state.user.breakDown.twitter.screenName} />
          <Card className="Dashboard-main" style={styles.DashboardMain}>
            <div className="Dashboard-topRow" style={styles.DashboardTopRow}>
              <CardText className="Dashboard-header" style={styles.DashboardHeader}>Social Score</CardText>
              <CardText className="Dashboard-sc" style={styles.DashboardSC}>{this.state.user.socialScore}/1000</CardText>
            </div>
            <div className="Dashboard-secondRow" style={styles.DashboardSecondRow}>
              <CardText className="Dashboard-maxAmount-header" style={styles.DashboardMaxAmountHeader}>Maximum eligible Amount</CardText>
              <CardText className="Dashboard-maxAmount" style={styles.DashboardMaxAmount}>{`\u20B9 ${this.state.user.maxAmount}`}</CardText>
            </div>
            <LoanHistory
              loans={this.state.loans}
              user={this.state.user}
              addLoan={(newLoan) => {
                this.setState(prevState => ({
                  ...prevState,
                  loans: [...prevState.loans, newLoan],
                }));
              }}
              payEmi={loan => this.payEmi(loan)}
            />
            {/* <div>{JSON.stringify(this.state.loans)}</div> */}
          </Card>
          <Card className="Dashboard-profile">
            <img
              src={this.state.profilePicture}
              className="Dashboard-profile-pic"
              alt="User profile"
            />
            <div className="Dashboard-greeting">
              {`Hello, ${this.state.user.firstName}`}
            </div>
            {(this.state.user.breakDown.twitter.followersCount === 0) ?
              <a
                href={`http://localhost:8080/api/auth/twitter?accessToken=${localStorage.getItem('accessToken')}`}
                style={styles.twitterConnect}
              >
                <div style={{
                  display: 'flex',
                }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/fr/c/c8/Twitter_Bird.svg"
                    style={{
                      height: '24px',
                      width: '24px',
                    }}
                    alt="twitter logo"
                  />
                  <span style={{
                    alignSelf: 'center',
                    fontWeight: '100',
                    paddingLeft: '8px',
                    textTransform: 'uppercase',
                  }}
                  >Connect Twitter
                  </span>
                </div>
              </a> : undefined}
            <div className="Dashboard-breakdown">
              <ScoreBreakdown breakDown={this.state.user.breakDown} />
            </div>
          </Card>
        </div>
      </div>
  );
}

Dashboard.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
};

export default Dashboard;
