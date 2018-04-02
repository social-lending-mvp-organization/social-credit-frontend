import React from 'react';
import { withRouter } from 'react-router';
import { Col, Grid, Row, Table } from 'react-bootstrap';

import { connectionsAuth } from '../../Auth';
import twitterLogo from '../../media/twitter-login.png';

import Title from '../Title';
import './Connections.css';

const Connections = props => (
  <Grid>
    <hr />
    <Row><Title label="Your connections" /></Row>
    <Row>
      <Col lg={12}><h3>Facebook </h3></Col>
      <Col lg={12}>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td className="Connections-table-column">Visit profile</td>
              <td className="Connections-table-column"><a target="_blank" href={`https://facebook.com/${props.connections.facebook.sub.split('|')[1]}`}>{props.connections.facebook.name}</a></td>
            </tr>
            <tr>
              <td className="Connections-table-column">Number of friends</td>
              <td className="Connections-table-column">{props.user.breakDown.facebook.friendsCount}</td>
            </tr>
            <tr>
              <td className="Connections-table-column">Contribution to Score</td>
              <td className="Connections-table-column">{props.user.breakDown.facebook.impact}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
    <Row>
      <Col lg={12}><h3>Twitter </h3></Col>
      <Col lg={12}>
        {props.user.breakDown.twitter.screenName !== '' ?
          <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <td className="Connections-table-column">Direct followers count</td>
                <td className="Connections-table-column">{props.user.breakDown.twitter.followersCount}</td>
              </tr>
              <tr>
                <td className="Connections-table-column">Second degree followers count</td>
                <td className="Connections-table-column">{props.user.breakDown.twitter.secondFollowersCount}</td>
              </tr>
              <tr>
                <td className="Connections-table-column">Contribution to Score</td>
                <td className="Connections-table-column">{props.user.breakDown.twitter.impact}</td>
              </tr>
            </tbody>
          </Table>
          :
          <button onClick={() => { connectionsAuth.login(); }}>
            <img
              src={twitterLogo}
              style={{ cursor: 'pointer' }}
              alt="twitter login"
            />
          </button>
        }
      </Col>
      <Col lg={12}><h3>More social media providers coming soon... </h3></Col>
    </Row>
  </Grid>
);

export default withRouter(Connections);
