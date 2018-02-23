import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

import fetchHelper from '../../lib/fetch-helper';

import './Dashboard.css';
import { facebook } from '../../lib/constants';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      accessToken: this.props.accessToken,
    };

    this.isBusy = true;
  }

  componentDidMount = () => {
    const headers = new Headers();
    headers.append('accesstoken', this.state.accessToken);

    fetchHelper('/api/users/login', {
      headers,
      method: 'POST',
    })
      .then((loginStatus) => {
        if (loginStatus.statusCode === 200) {
          fetchHelper('/api/users/info', {
            method: 'GET',
            headers,
          })
            .then((userDetails) => {
              if (userDetails.data) {
                this.setState({
                  user: userDetails.data,
                });
              }
            })
            .then(() => fetchHelper(`${facebook.profilePicture}&height=240&width=240&access_token=${this.state.accessToken}`))
            .then((data) => {
              this.setState(prevState => ({
                ...prevState,
                profilePicture: data.data.url,
              }));
            })
            .then(() => {
              // Get Loans
              // fetch('/api/users/loans');

              this.isBusy = false;
            });
        }
      });
    // Check user login
    // Get user details
    // Get facebook profile pic
    // Get loans data
  }

  render = () => (
    !this.state.user ?
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
      <div style={{
        height: '100%',
      }}
      >
        <AppBar
          title="Social-Credit"
          showMenuIconButton={false}
        />
        <div className="Dashboard" >
          <Card className="Dashboard-container">
            <div className="Dashboard-sc-section">
              <div className="Dashboard-header">Social Score</div>
              <div className="Dashboard-sc">{this.state.user.socialScore}</div>
            </div>
            {/* <LoanHistory loans={this.state.user.loans} /> */}
          </Card>
          <Card className="Dashboard-profile" >
            <img
              src={this.state.profilePicture}
              className="Dashboard-profile-pic"
              alt="User profile"
            />
            <div className="Dashboard-greeting">
              {`Hello, ${this.state.user.firstName}`}
            </div>
          </Card>
        </div >
      </div>
  );
}

Dashboard.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default Dashboard;
