import React from 'react';
import PropTypes from 'prop-types';

import { app } from '../../lib/constants';
import { fetchHelper } from '../../lib/fetch-helper';

class NewLoan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewLoanForm: false,
      amount: 25000,
      installments: 12,
    };
  }

  applyNewLoanClick = () => {
    this.setState({
      ...this.state,
      showNewLoanForm: true,
      isError: false,
      errorMessage: '',
    });
  }

  render = () => (
    <div className="NewLoan">
      {
        this.state.showNewLoanForm ?
          <div>
            <label htmlFor="amount">Enter amount: <input
              type="currency"
              value={this.state.amount}
              onChange={event => this.setState({ ...this.state, amount: event.target.value })}
            />
            </label>
            <br />
            <label htmlFor="installments">Select number of installments: {this.state.installments}<input
              type="range"
              value={this.state.installments}
              min={12}
              max={36}
              step={6}
              onChange={event => this.setState({ ...this.state, installments: event.target.value })}
            />
            </label>
            <button onClick={async () => {
              await this.props.applyForLoan(this.state.amount, this.state.installments);
            }}
            >Apply
            </button>
          </div>
          :
          <button onClick={() => this.applyNewLoanClick()}>Apply for a new loan</button>
      }
    </div >
  );
}

NewLoan.propTypes = {
  onNewLoanClick: PropTypes.func.isRequired,
};

export default NewLoan;