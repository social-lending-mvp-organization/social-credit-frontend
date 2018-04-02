import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Motion, spring } from 'react-motion';
import currencyFormatter from 'currency-formatter';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Connections from '../Connections';
import Title from '../Title';
import NetworkGraph from '../NetworkGraph';

import './YourScore.css';

const YourScore = props => (
  <Grid className="YourScore">
    <Row>
      <Col xs={12}>
        <Title label="Social score" />
      </Col>
      <Col lg={6}>
        <div>
          <div style={{ fontSize: '1em' }}>
            <Motion
              defaultStyle={{ percentage: 0, fontSize: '1em' }}
              style={{
                percentage: spring(
                  props.user.socialScore,
                  { stiffness: 300, damping: 40 },
                ),
                fontSize: '1em',
              }}
            >
              {value => (
                <CircularProgressbar
                  textForPercentage={text => `${text * 10}/1000`}
                  percentage={Math.floor(value.percentage) / 10}
                  style={{ fontSize: '1em' }}
                />)
              }
            </Motion>
          </div>
        </div>
        <div>
          <div className="YourScore-MaxAmount-Text">Maximum loan amount</div>
          <div className="YourScore-MaxAmount">
            {currencyFormatter.format(props.user.maxAmount, { code: 'INR' })}
          </div>
        </div>
      </Col>

      <Col lg={6}>
        {
          props.user.breakDown.twitter.screenName === '' ?
            <div>
              Connect twitter to improve your score...
            </div>
            :
            <NetworkGraph screenName={props.user.breakDown.twitter.screenName} />
        }
      </Col>
      <Col lg={12}>
        <Connections
          user={props.user}
          connections={props.connections}
        />
      </Col>
    </Row>
  </Grid >
);

export default YourScore;
