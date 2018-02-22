import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

import './css/LoanHistory.css';

import config from './config.json';

class LoanHistory extends React.Component {
  /**
   * Generates the table header row using table header keys
   * @param {string[]} tableHeaders keys containing table headers
   */
  static getHeaderList(tableHeaders) {
    const headerList = tableHeaders.map((header, index) => {
      const rowKey = `row-${index}`;
      return <th key={rowKey}>{header}</th>;
    });
    return headerList;
  }

  /**
   * Generates table rows using data and keys
   * @param {Object[]} data
   * @param {string[]} tableHeaders
   */
  static getTableRows(data, tableHeaders) {
    const tableRows = data.map((row, index) => {
      const tableColumns = tableHeaders.map(key => <td key={key}>{row[key]}</td>);
      const rowKey = `row-${index}`;
      return (
        <tr key={rowKey}>
          {tableColumns}
        </tr>
      );
    });
    return tableRows;
  }

  constructor(props) {
    super(props);
    this.state = {
      loanPaid: false,
    };
    this.payLoan = this.payLoan.bind(this);

    const requestUrl = config.serverUrl + config.routes.info;
    const requestObj = {
      userid: props.userid,
    };
    axios.post(requestUrl, requestObj).then((response) => {
      this.setState({
        data: response.data,
      });
    });
  }

  payLoan() {
    const requestUrl = config.serverUrl + config.routes.payLoan;
    const requestObj = {
      userid: this.props.userid,
      amount: 1000,
    };
    axios.post(requestUrl, requestObj).then((response) => {
      this.setState({
        loanPaid: response.data.message === 'Paid',
      });
    });
  }

  render() {
    const { data } = this.state;
    if (!this.props.isLoggedIn || !data) {
      return (<div />);
    }
    if (this.state.loanPaid) {
      data[data.length - 1]['Paid on'] = data[data.length - 1]['Due on'];
    }
    const tableHeaders = Object.keys(data[0]);
    const headerList = LoanHistory.getHeaderList(tableHeaders);
    const tableRows = LoanHistory.getTableRows(data, tableHeaders);
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr key="head">
              {headerList}
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </Table>
        <div>
          <Button id="pay-loan-button" onClick={this.payLoan}>Pay Loan</Button>
        </div>
      </div>
    );
  }
}
LoanHistory.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userid: PropTypes.string.isRequired,
};

export default LoanHistory;
