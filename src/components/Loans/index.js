import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

import Title from '../Title';
import NewLoan from '../NewLoan';
import Emi from '../Emi';

class Loans extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      applyForLoanDialog: false,
      applyForLoanButtonEnabled: true,
      amount: 10000,
      installments: 12,
    };

    // this.dialogActions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary
    //     onClick={() => {
    //       this.setState(prevState => ({
    //         ...prevState,
    //         applyForLoanDialog: false,
    //         applyForLoanButtonEnabled: true,
    //       }));
    //     }}
    //   />,
    //   <FlatButton
    //     label="Apply"
    //     primary
    //     onClick={async () => {
    //       const headers = new Headers();
    //       headers.append('accesstoken', sessionStorage.getItem('accessToken'));
    //       headers.append('Content-Type', 'application/json');

    //       const loansResponse = await fetchHelper('/api/users/loans', {
    //         headers,
    //         method: 'POST',
    //         body: JSON.stringify({
    //           totalAmount: this.state.amount,
    //           totalInstallments: this.state.installments,
    //         }),
    //       });

    //       if (loansResponse.statusCode === 201) {
    //         this.props.addLoan({
    //           ...loansResponse.data,
    //         });
    //       }

    //       this.setState(prevState => ({
    //         ...prevState,
    //         applyForLoanDialog: false,
    //         applyForLoanButtonEnabled: true,
    //       }));
    //     }}
    //   />,
    // ];
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
    <Grid>
      <Row>
        <Col>
          <Title label="Loans" />
          {
            this.props.loans
              .filter(p => p.outstandingInstallments > 0).length === 0 ?
                <NewLoan applyForLoan={async (amount, installments) => { await this.props.applyForLoan(amount, installments); }} />
              :
                <Emi
                  payEmi={async () => { await this.props.payEmi(); }}
                  loans={this.props.loans}
                />
          }
          <ReactTable
            data={this.props.loans}
            columns={[
              {
                Header: 'Status',
                accessor: 'outstandingInstallments',
              },
              {
                Header: 'Amount left',
                accessor: 'outstandingAmount',
              },
              {
                Header: 'EMIs left',
                accessor: 'outstandingInstallments',
              },
              {
                Header: 'Total amount',
                accessor: 'totalAmount',
              },
            ]}
            showPagination={false}
            noDataText="You don't have any loans..."
          />

          {/* {(this.props.loans.length > 0) ?
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
      </Dialog> */}
        </Col>
      </Row>
    </Grid>
  );
}

Loans.propTypes = {
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

export default Loans;
