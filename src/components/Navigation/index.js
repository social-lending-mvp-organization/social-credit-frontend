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
            onClick={() => props.navigate(0)}
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
          onClick={() => props.navigate(1)}
        >
          Loans
        </Navbar.Link>
        <Navbar.Link
          bsStyle="primary"
          style={styles.navPrimaryItem}
          onClick={() => props.navigate(2)}
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
