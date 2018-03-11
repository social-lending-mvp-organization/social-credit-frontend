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
    }
  }

  render = () => (
    (!this.state.user || !this.state.loans) ?
      <div>
        <Dialog
          className="Dashboard-user-data-dialog"
          title="Loading user data..."
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
            onClick={
              () => {
                window.FB.logout();
                localStorage.removeItem('accessToken');
                this.props.changeLoginState(false);
              }
            }
          />}
        />
        <div className="Dashboard-container">
          <Card style={styles.scSection}>
            <CardText className="Dashboard-header">Social Score</CardText>
            <CardText className="Dashboard-sc">{this.state.user.socialScore}/100</CardText>
            <LoanHistory loans={this.state.loans} />
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
            <div className="Dashboard-breakdown">
              <ScoreBreakdown
                fbFriends={this.state.user.fbFriends}
                twitterFOF={this.state.user.twitterFOF}
              />
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