import React from 'react';
import { Badge, Col, Grid, Panel, Row } from 'react-bootstrap';
import { Motion, spring } from 'react-motion';
import currencyFormatter from 'currency-formatter';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Title from '../Title';

const YourScore = props => (
  <Grid className="YourScore">
    <Row>
      <Col>
        <div>
          <Title label="Social score" />
          <div>
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
          </div>
        </div>
        <div>
          <div>Maximum loan amount</div>
          <div>
            {currencyFormatter.format(props.user.maxAmount, { code: 'INR' })}
          </div>
        </div>
      </Col>
    </Row>
  </Grid >
);

export default YourScore;
