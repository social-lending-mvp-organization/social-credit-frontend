import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

// import './Login.css';
import * as styles from './Login.style';

class Login extends React.Component {
  login = () => {
    this.props.auth.login();
    this.props.history.replace('/');
  }

  logout = () => {
    this.props.auth.logout(this.props.history);
  }

  render = () => {
    const isAuthenticated = this.props.auth.isAuthenticate();

    if (isAuthenticated) this.props.history.replace('/');
    return (
      <div>
        <Navbar
          fluid
          style={styles.navBar}
          className="bg-primary navbar-dark"
        >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Social Credit</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <Navbar.Link
              bsStyle="primary"
              className="btn-margin"
              onClick={() => this.login()}
            >
                  Log In
            </Navbar.Link>
          </Nav>
        </Navbar>
      </div >
    );
  }
}

export default withRouter(Login);
