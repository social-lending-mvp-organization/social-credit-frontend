import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Slider from 'material-ui/Slider';
import { CardText } from 'material-ui/Card';

import fetchHelper from '../../lib/fetch-helper';
import * as styles from './styles';

import Emi from '../Emi';

class LoanHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      applyForLoanDialog: false,
      applyForLoanButtonEnabled: true,
      amount: 25000,
      installments: 12,
    };
    this.SPACE = ' ';

    this.dialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => {
          this.setState(prevState => ({
            ...prevState,
            applyForLoanDialog: false,
            applyForLoanButtonEnabled: true,
          }));
        }}
      />,
      <FlatButton
        label="Apply"
        primary
        onClick={async () => {
          const headers = new Headers();
          headers.append('accesstoken', sessionStorage.getItem('accessToken'));
          headers.append('Content-Type', 'application/json');

          const loansResponse = await fetchHelper('/api/users/loans', {
            headers,
            method: 'POST',
            body: JSON.stringify({
              totalAmount: this.state.amount,
              totalInstallments: this.state.installments,
            }),
          });

          if (loansResponse.statusCode === 201) {
            this.props.addLoan({
              ...loansResponse.data,
            });
          }

          this.setState(prevState => ({
            ...prevState,
            applyForLoanDialog: false,
            applyForLoanButtonEnabled: true,
          }));
        }}
      />,
    ];
  }

  handleAmountSlider = (event, newValue) => {
    this.setState(prevState => ({
      ...prevState,
      amount: newValue,
    }));
  }

  handleInstallmentsSlider = (event, newValue) => {
    this.setState(prevState => ({
      ...prevState,
      installments: newValue,
    }));
  }

  render = () => (

    <div>
      {(this.props.loans.length > 0) ?
        <div>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn tooltip="Amount to pay back">Amount left</TableHeaderColumn>
                <TableHeaderColumn tooltip="Amount for which loan was approved">Total Amount</TableHeaderColumn>
                <TableHeaderColumn tooltip="Installments left">EMIs left</TableHeaderColumn>
                <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.loans.map(loan => (
                <TableRow>
                  <TableRowColumn>{`\u20B9${loan.outstandingAmount}`}</TableRowColumn>
                  <TableRowColumn>{`\u20B9${loan.totalAmount}`}</TableRowColumn>
                  <TableRowColumn>{loan.outstandingInstallments}</TableRowColumn>
                  <TableRowColumn>{loan.outstandingInstallments > 0 ? 'PENDING' : 'PAID'}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Emi
            loans={this.props.loans}
            payEmi={(loan) => { this.props.payEmi(loan); }}
          />
        </div>
        :
        <div>
          <p>{'You don\'t have any loans.'}</p>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
              style={{ height: 0, padding: 0 }}
            >
              <TableRow >
                <TableHeaderColumn>{this.SPACE}</TableHeaderColumn>
                <TableHeaderColumn>{this.SPACE}</TableHeaderColumn>
                <TableHeaderColumn>{this.SPACE}</TableHeaderColumn>
                <TableHeaderColumn>{this.SPACE}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
        </div>}

      <RaisedButton
        label="Apply for loan"
        style={this.props.loans.filter(p => p.outstandingInstallments > 0).length > 0 ?
          { display: 'none' } : styles.applyForLoanButton}
        disabled={!this.state.applyForLoanButtonEnabled}
        onClick={() => {
          this.setState(prevState => ({
            ...prevState,
            applyForLoanDialog: true,
            applyForLoanButtonEnabled: false,
          }));
        }}
      />
      <Dialog
        title="Apply for loan"
        modal
        open={this.state.applyForLoanDialog}
        actions={this.dialogActions}
      >
        <CardText>{`Loan Amount: ${this.state.amount}`}</CardText>
        <Slider
          step={25000}
          min={25000}
          max={this.props.user.maxAmount}
          defaultValue={25000}
          value={this.state.amount}
          onChange={this.handleAmountSlider}
        />
        <CardText>{`Number of EMIs: ${this.state.installments}`}</CardText>
        <Slider
          step={6}
          min={12}
          max={36}
          label={this.state.installments}
          onChange={this.handleInstallmentsSlider}
        />
      </Dialog>
    </div>
  );
}

LoanHistory.propTypes = {
  loans: PropTypes.arrayOf(PropTypes.shape({
    outstandingAmount: PropTypes.number,
    totalAmount: PropTypes.number,
    createdAt: PropTypes.date,
    outstandingInstallments: PropTypes.date,
    totalInstallments: PropTypes.number,
    emis: PropTypes.object,
  })).isRequired,
  user: PropTypes.object.isRequired,
  addLoan: PropTypes.func.isRequired,
  payEmi: PropTypes.func.isRequired,
};

export default LoanHistory;
