import currencyFormatter from 'currency-formatter';
import React from 'react';
import { withRouter } from 'react-router';
import { Badge, Grid, Row, Col, Image, Panel } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import { Motion, spring } from 'react-motion';

import 'react-circular-progressbar/dist/styles.css';
import * as styles from './Dashboard.style';
import './Dashboard.css';

const Dashboard = props => (
  <Grid
    style={{
      ...props.style,
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
      > <span style={styles.userName}>{`${props.user.firstName} ${props.user.lastName}`}</span>
      </Col>
      <Col md={12} lg={6} style={styles.holder}>
        <Image
          src={props.connections[0].picture}
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
            Connect your Twitter account to view your social graph...
          </Panel.Body>
        </Panel>
      </Col>
      <Col md={12} lg={6}>
        <Panel style={styles.row}>
          <Panel.Heading style={{
            ...styles.subHeading,
          }}
          > Social score <Badge onClick={async () => { await props.retrieveProfile(); }}><i className="fas fa-sync" /></Badge>
          </Panel.Heading>
          <Panel.Body>
            <Motion
              defaultStyle={{ percentage: 0 }}
              style={{
                percentage: spring(
                  props.user.socialScore,
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
            {currencyFormatter.format(props.user.maxAmount, { code: 'INR' })}
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  </Grid >
);

export default withRouter(Dashboard);
