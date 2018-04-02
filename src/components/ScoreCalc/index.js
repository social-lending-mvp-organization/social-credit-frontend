import React from 'react';
import { Col, Grid, Table, Row } from 'react-bootstrap';

import logo from '../../media/logo.svg';
import Title from '../Title';
import './ScoreCalc.css';

const ScoreCalc = () => (
  <Grid className="ScoreCalc">
    <Row>
      <Col>
        <Title label="How do we calculate your Social Score?" />
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td className="Connections-table-column">Data taken from facebook</td>
              <td className="Connections-table-column">Number of friends</td>
            </tr>
            <tr>
              <td className="Connections-table-column">Data taken from twitter</td>
              <td className="Connections-table-column">Number of followers and number of their followers</td>
            </tr>
            <tr>
              <td className="Connections-table-column">1 Facebook friends contributes 0.2 in Social Score</td>
              <td className="Connections-table-column">As more Facebook friends you have, better score you will have.</td>
            </tr>
          </tbody>
        </Table>
        <p>In twitter each follower&quot;s contribution to your score is different.</p>

        <p>A follower with higher number of followers will contribute more
             to the social score than a follower with a lower follower count.
        </p>

        <p>Having more influential followers will help you improve your social score.</p>
      </Col>
      <Col lg={12}>
        <img
          src={logo}
          className="ScoreCalc-Logo"
          alt="Social credit logo"
        />
      </Col>
    </Row>
  </Grid>
);

export default ScoreCalc;
