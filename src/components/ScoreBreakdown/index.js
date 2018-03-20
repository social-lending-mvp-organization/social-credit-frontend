import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';

import PropTypes from 'prop-types';

const fbMath = n => Math.floor(n / 50);

const C = 60;
const twitterMath = n => Math.floor(((n / (C * C)) * 100) / 2);

const fbDiv = facebookBreakDown => (
  <TableRow className="ScoreBreakdown-FB">
    <TableRowColumn>Facebook friends</TableRowColumn>
    <TableRowColumn> {facebookBreakDown.friendsCount} </TableRowColumn>
    <TableRowColumn> {facebookBreakDown.impact} </TableRowColumn>
  </TableRow>
);

const twitterDiv = twitterBreakDown => (
  <TableRow className="ScoreBreakdown-twitter">
    <TableRowColumn>Twitter followers of followers</TableRowColumn>
    <TableRowColumn> {twitterBreakDown.secondFollowersCount} </TableRowColumn>
    <TableRowColumn> {twitterBreakDown.impact} </TableRowColumn>
  </TableRow>
);

const compoundScore = (fbScore, twitterScore) => {
  if (twitterScore) {
    return Math.min((fbScore + twitterScore), 100);
  }
  return fbScore;
};

const totalDiv = breakDown => (
  <TableRow className="ScoreBreakdown-twitter">
    <TableRowColumn>Total</TableRowColumn>
    <TableRowColumn> - </TableRowColumn>
    <TableRowColumn> {breakDown.facebook.impact + breakDown.twitter.impact}
    </TableRowColumn>
  </TableRow>
);

const ScoreBreakdown = props => (
  <Table className="ScoreBreakdown">
    <TableHeader displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn />
        <TableHeaderColumn>Number</TableHeaderColumn>
        <TableHeaderColumn>Score impact</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {fbDiv(props.breakDown.facebook)}
      {props.breakDown.twitter ? twitterDiv(props.breakDown.twitter) : null}
    </TableBody>
    <TableFooter adjustForCheckbox={false}>
      {totalDiv(props.breakDown)}
    </TableFooter>
  </Table >
);

ScoreBreakdown.propTypes = {
  fbFriends: PropTypes.number.isRequired,
  twitterFOF: PropTypes.number,
};

ScoreBreakdown.defaultProps = {
  twitterFOF: null,
};

export default ScoreBreakdown;
