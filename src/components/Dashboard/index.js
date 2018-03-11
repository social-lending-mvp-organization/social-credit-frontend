import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

import fetchHelper from '../../lib/fetch-helper';

import './Dashboard.css';
import { facebook } from '../../lib/constants';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.isBusy = true;
  }

  componentDidMount = async () => {
    const headers = new Headers();
    const accessToken = localStorage.getItem('accessToken');
    headers.append('accesstoken', accessToken);

    const loginStatus = await fetchHelper('/api/users/login', {
      headers,
      method: 'POST',
    });
    if (loginStatus.statusCode === 200) {
      const userDetailsResponse = await fetchHelper('/api/users/info', {
        method: 'GET',
        headers,
      });
      const fetchProfilePictureUrl = `${facebook.profilePicture}&height=240&width=240&access_token=${accessToken}`;
      const profilePictureResponse = await fetchHelper(fetchProfilePictureUrl);
      this.setState({
        user: userDetailsResponse.data,
        profilePicture: profilePictureResponse.data.url,
      });
      /*
      // TODO: Handle loans data
      const loanResponse = await fetchHelper(/api/users/loans);
      this.setState(prevState => ({
        ...prevState,
        loans: loanResponse.data
      }));
      */
      this.isBusy = false;
    } else {
      /*
        what?
      */
    }
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
  changeLoginState: PropTypes.func.isRequired,
};

export default Dashboard;
