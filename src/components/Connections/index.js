import React from 'react';
import { withRouter } from 'react-router';
import { Col, Grid, Row, Table } from 'react-bootstrap';

import { connectionsAuth } from '../../Auth';

const Connections = props => (
  <Grid>
    <Row><h1>Your connections</h1></Row>
    <hr />
    <Row>
      <Col lg={12}><h2>Facebook </h2></Col>
      <Col lg={12}>
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <td>Visit profile</td>
              <td><a target="_blank" href={`https://facebook.com/${props.connections.facebook.sub.split('|')[1]}`}>{props.connections.facebook.name}</a></td>
            </tr>
            <tr>
              <td>Number of friends</td>
              <td>{props.user.breakDown.facebook.friendsCount}</td>
            </tr>
            <tr>
              <td>Contribution to Score</td>
              <td>{props.user.breakDown.facebook.impact}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
    <hr />

    <Row>
      <Col lg={12}><h2>Twitter </h2></Col>
      <Col lg={12}>
        {props.user.breakDown.twitter.screenName !== '' ?
          <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <td>Direct followers count</td>
                <td>{props.user.breakDown.twitter.followersCount}</td>
              </tr>
              <tr>
                <td>Second degree followers count</td>
                <td>{props.user.breakDown.twitter.secondFollowersCount}</td>
              </tr>
              <tr>
                <td>Contribution to Score</td>
                <td>{props.user.breakDown.twitter.impact}</td>
              </tr>
            </tbody>
          </Table>
          :
          <img
            src={require('../../media/twitter-login.png')}
            onClick={() => { connectionsAuth.login(); }}
            style={{ cursor: 'pointer' }}
          />
        }
      </Col>
    </Row>
  </Grid>
);

export default withRouter(Connections);
