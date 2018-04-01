import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import Title from '../Title';

const ScoreCalc = () => (
  <Grid className="ScoreCalc">
    <Row>
      <Col>
        <Title label="Score Calculation" />
      </Col>
    </Row>
  </Grid>
);

export default ScoreCalc;
