import React from 'react';

import * as styles from './Emi.style';

const Emi = props => (
  <div className="Emi">
    <button
      style={styles.EmiPayEmiButton}
      onClick={async () => {
        // const loans = props.loans.filter(p => p.outstandingAmount > 0);
        // if (loans.length === 1) {
        //   const loan = loans[0];
        //   const headers = new Headers();
        //   headers.append('accesstoken', sessionStorage.getItem('accessToken'));


        //   const payEmiResponse = await fetchHelper('/api/users/emi', {
        //     headers,
        //     method: 'POST',
        //     body: JSON.stringify({
        //       amount: loan.outstandingAmount / loan.outstandingInstallments,
        //     }),
        //   });

        //   if (payEmiResponse.statusCode === 201) {
        //     props.payEmi(loan);
        //   } else { // TODO
        //   }
        // }
      }}
    >
      Pay EMI
    </button>
  </div>
);

export default Emi;
