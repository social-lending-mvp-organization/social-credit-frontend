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

const fbDiv = fbFriends => (
  <TableRow className="ScoreBreakdown-FB">
    <TableRowColumn>Facebook friends</TableRowColumn>
    <TableRowColumn> {fbFriends} </TableRowColumn>
    <TableRowColumn> {fbMath(fbFriends)} </TableRowColumn>
  </TableRow>
);

const twitterDiv = twitterFOF => (
  <TableRow className="ScoreBreakdown-twitter">
    <TableRowColumn>Twitter followers of followers</TableRowColumn>
    <TableRowColumn> {twitterFOF} </TableRowColumn>
    <TableRowColumn> {twitterMath(twitterFOF)} </TableRowColumn>
  </TableRow>
);

const totalDiv = (fbFriends, twitterFOF) => (
  <TableRow className="ScoreBreakdown-twitter">
    <TableRowColumn>Total</TableRowColumn>
    <TableRowColumn> - </TableRowColumn>
    <TableRowColumn> {fbMath(fbFriends) + (twitterMath(twitterFOF) || 0)} </TableRowColumn>
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
      {fbDiv(props.fbFriends)}
      {props.twitterFOF ? twitterDiv(props.twitterFOF) : null}
    </TableBody>
    <TableFooter adjustForCheckbox={false}>
      {totalDiv(props.fbFriends, props.twitterFOF)}
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
