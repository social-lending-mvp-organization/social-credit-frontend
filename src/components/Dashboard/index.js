import currencyFormatter from 'currency-formatter';
import React from 'react';
import { withRouter } from 'react-router';
import { Badge, Grid, Row, Col, Image, Panel, Modal } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import { Motion, spring } from 'react-motion';

import NetworkGraph from '../NetworkGraph';

import 'react-circular-progressbar/dist/styles.css';
import * as styles from './Dashboard.style';
import './Dashboard.css';

import { signUpAuth } from '../../Auth';

class Dashboard extends React.Component {
  componentDidMount = async () => {
    const isAuthenticated = signUpAuth.isAuthenticate();
    console.log('login', isAuthenticated);
    if (isAuthenticated) {
      await this.props.login();
    }
  }

  render = () => {
    const isAuthenticated = signUpAuth.isAuthenticate();

    if (!isAuthenticated) {
      this.props.history.replace('/login');
      return null;
    }

    return (
      !this.props.isBusy.loaded ?
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Hold on</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.isBusy.message}</Modal.Body>
        </Modal.Dialog>
        :
        <Grid
          style={{
            ...this.props.style,
            ...styles.dashboard,
            backgroundColor: '#F3F3F3',
          }}
        >
          <Row style={{
            ...styles.row,
            ...styles.userCover,
          }}
          >
            <Col
              md={12}
              lg={6}
              style={{
                ...styles.userGreet,
                ...styles.heading,
              }}
            > <h1 >{`${this.props.user.firstName} ${this.props.user.lastName}`}</h1>
            </Col>
            <Col md={12} lg={6} style={styles.holder}>
              <Image
                src={this.props.connections.facebook.picture}
                responsive
                style={styles.userPicture}
              />
            </Col>
          </Row>

          <Row style={{
            ...styles.row,
            paddingTop: '16px',
          }}
          >
            <Col md={12} lg={6} >
              <Panel>
                <Panel.Heading style={styles.subHeading}>
                  Social Graph
                </Panel.Heading>
                <Panel.Body>
                  {this.props.user.breakDown.twitter.screenName === '' ?
                    <div>Connect your Twitter account to view your social graph...</div>
                    :
                    <NetworkGraph
                      screenName={this.props.user.breakDown.twitter.screenName}
                      socialGraph={this.props.socialGraph}
                    />
                  }
                </Panel.Body>
              </Panel>
            </Col>
            <Col md={12} lg={6}>
              <Panel style={styles.row}>
                <Panel.Heading style={{
                  ...styles.subHeading,
                }}
                > Social score <Badge onClick={async () => { await this.props.retrieveProfile(); }}><i className="fas fa-sync" /></Badge>
                </Panel.Heading>
                <Panel.Body>
                  <Motion
                    defaultStyle={{ percentage: 0 }}
                    style={{
                      percentage: spring(
                        this.props.user.socialScore,
                        { stiffness: 300, damping: 40 },
                      ),
                    }}
                  >
                    {value => (
                      <CircularProgressbar
                        textForPercentage={text => `${text * 10}/1000`}
                        percentage={Math.floor(value.percentage) / 10}
                      />)
                    }
                  </Motion>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading style={styles.subHeading}>Maximum loan amount</Panel.Heading>
                <Panel.Body>
                  {currencyFormatter.format(this.props.user.maxAmount, { code: 'INR' })}
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid >
    );
  }
}

export default withRouter(Dashboard);
