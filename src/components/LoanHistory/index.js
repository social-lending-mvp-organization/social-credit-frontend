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
import { FlatButton } from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Slider from 'material-ui-slider-label/Slider';
import { CardText } from 'material-ui/Card';

class LoanHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      applyForLoanDialog: false,
      applyForLoanButtonEnabled: true,
      amount: 25000,
      installments: 12,
    };

    this.dialogActions = [
      (<FlatButton
        label="Cancel"
        primary
      />),
      (<FlatButton
        label="Submit"
        primary
        disabled
      />),
    ];
  }

  render = () => (

    <div>
      {(this.props.loans.length > 0) ?
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
        :
        <div>
          <p>{'You don\'t have any loans.'}</p>

        </div>}

      <RaisedButton
        label="Apply for loan"
        style={this.props.loans.filter(p => p.outstandingInstallments > 0).length > 0 ?
          { display: 'none' } : {}}
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
      >
        <CardText>{`Loan Amount: ${this.state.amount}`}</CardText>
        <Slider
          step={25000}
          min={25000}
          max={this.props.user.maxAmount}
          label={this.state.amount}
          onChange={(e) => {
            this.setState(prevState => ({
              ...prevState,
            }));
          }}
        />
        <Slider
          step={12}
          min={12}
          max={36}
          label={this.state.installments}
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
};

export default LoanHistory;
