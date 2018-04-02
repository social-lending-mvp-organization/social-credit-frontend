import React from 'react';
import { Col, Grid, Navbar, Nav, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { signUpAuth } from '../../Auth';

import logo from '../../media/logo.svg';
import './Navigation.css';

const Navigation = props => (
  <Navbar fluid className="Navigation">
    <Navbar.Brand>
      <button
        onClick={() => props.navigate(0)}
        className="Navigation-brand"
      >
        <img className="Navigation-logo" src={logo} alt="Social credit logo" />
        <div className="Navigation-brand-name Navigation-item">Social Credit</div>
      </button>
    </Navbar.Brand>
    <Nav pullRight>
      <button
        bsStyle="primary"
        className="Navigation-item"
        onClick={() => props.navigate(1)}
      >
        Loans
      </button>
      <button
        bsStyle="primary"
        className="Navigation-item"
        onClick={() => props.navigate(2)}
      >
        Score Calculation
      </button>
      <button
        bsStyle="primary"
        className="Navigation-item"
        onClick={() => signUpAuth.logout(props.history)}
      >
        Log Out
      </button>
    </Nav>
  </Navbar>
);

export default withRouter(Navigation);
