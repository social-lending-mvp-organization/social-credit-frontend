import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Image, Modal, Navbar, Nav, Row } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import fetchHelper from '../../lib/fetch-helper';
import { app } from '../../lib/constants';

import './Container.css';
import * as styles from './Container.style';

import ScoreBreakdown from '../ScoreBreakdown';
import LoanHistory from '../LoanHistory';


class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBusy: true,
      message: '',
      user: undefined,
      loans: [],
    };
  }
  componentDidMount = async () => {
    this.setState(prevState => ({
      ...prevState,
      isBusy: true,
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
        this.props.auth.logout(this.props.history);
      }

      const { apiToken } = loginStatus;
      sessionStorage.setItem(app.apiToken, apiToken);

      this.setState(prevState => ({
        ...prevState,
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
          const p = 3;
          const userProfile = await this.props.auth.userInfo();

          const loanHeaders = new Headers();
          loanHeaders.append(app.accessToken, sessionStorage.getItem(app.apiToken));
          const loansData = await fetchHelper('/api/users/loans', { headers: loanHeaders });
          this.setState(prevState => ({
            ...prevState,
            isBusy: false,
            loans: loansData.data,
            user: userDetailsResponse.data,
            userProfile,
          }));
        });
      });
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

  render = () => {
    const isAuthenticated = this.props.auth.isAuthenticate();

    if (!isAuthenticated) this.props.history.replace('/login');
    return (
      <div className="Container">
        {this.state.isBusy ?
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Hold on</Modal.Title>
            </Modal.Header>

            <Modal.Body>{this.state.message}</Modal.Body>
          </Modal.Dialog>
          :
          <div>
            <Navbar
              fluid
              className="bg-primary navbar-dark"
            >
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" href="/">Social Credit</Link>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav pullRight>
                <Navbar.Link
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={() => this.props.auth.logout(this.props.history)}
                >
                  Log Out
                </Navbar.Link>
              </Nav>
            </Navbar>

            <Grid>
              <Row>
                <Col md={12} lg={8} >
                  {/* // Social graph
                //Social score
                //max loan */}
                  <Row>
                    <Col>Your social score</Col>
                    <Col>{this.state.user.socialScore}</Col>
                  </Row>
                  <Row>
                    <Col>Maximum loan amount</Col>
                    <Col>{this.state.user.maxAmount}</Col>
                  </Row>
                </Col>
                <Col md={12} lg={4} >
                  {/* // profile pic
                // link accounts */}
                  <Image src={this.state.userProfile.picture} responsive />
                  {/* //<pre>{JSON.stringify(this.state, null, 4)}</pre> */}
                </Col>
              </Row>
            </Grid>
          </div>
        }
      </div>
    );
  };
}

Container.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
};

export default withRouter(Container);
