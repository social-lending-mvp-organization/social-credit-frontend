import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { signUpAuth } from '../../Auth';

import * as styles from './Navigation.style';

const Navigation = props => (
  <div className="Navigation">
    <Navbar
      fluid
      className="bg-primary navbar-dark"
    >
      <Navbar.Header>
        <Navbar.Brand>
          <Navbar.Link
            onClick={() => props.history.push('/')}
            style={{
              padding: '16px auto',
            }}
          >Social Credit
          </Navbar.Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav style={styles.navPrimaryItems}>
        <Navbar.Link
          bsStyle="primary"
          style={styles.navPrimaryItem}
          onClick={() => props.history.push('/connections')}
        >
          Connections
        </Navbar.Link>
        <Navbar.Link
          bsStyle="primary"
          style={styles.navPrimaryItem}
          to="/loans"
        >
          Loans
        </Navbar.Link>
        <Navbar.Link
          bsStyle="primary"
          style={styles.navPrimaryItem}
          to="/score"
        >
          Score Calculation
        </Navbar.Link>
      </Nav>
      <Nav style={styles.navSecondaryItems}>
        <Navbar.Link
          bsStyle="primary"
          className="btn-margin"
          onClick={() => signUpAuth.logout(props.history)}
        >
          Log Out
        </Navbar.Link>
      </Nav>
    </Navbar>
  </div>
);

export default withRouter(Navigation);
