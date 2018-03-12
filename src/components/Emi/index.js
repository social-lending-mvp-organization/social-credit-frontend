import React from 'react';
import { Card } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import fetchHelper from '../../lib/fetch-helper';

const Emi = props => (
  <div style={props.loans.filter(p => p.outstandingAmount > 0).length === 0 ?
    { display: 'none' } : {}}
  >
    <RaisedButton
      label="Pay EMI"
      onClick={async () => {
        const loans = props.loans.filter(p => p.outstandingAmount > 0);
        if (loans.length === 1) {
          const loan = loans[0];
          const headers = new Headers();
          headers.append('accesstoken', localStorage.getItem('accessToken'));


          const payEmiResponse = await fetchHelper('/api/users/emi', {
            headers,
            method: 'POST',
            body: JSON.stringify({
              amount: loan.outstandingAmount / loan.outstandingInstallments,
            }),
          });

          if (payEmiResponse.statusCode === 201) {
            props.payEmi(loan);
          } else { // TODO
          }
        }
      }}
    />
  </div>
);

export default Emi;
