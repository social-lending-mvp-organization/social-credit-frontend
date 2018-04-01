import React from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

import * as styles from './Emi.style';

const amount = (loans) => {
  const currentLoan = loans
    .filter(p => p.outstandingAmount > 0);

  if (currentLoan.length === 1) {
    return currentLoan[0].outstandingAmount /
      currentLoan[0].outstandingInstallments;
  }
  return undefined;
};

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
        ModalManager.open((
          <Modal
            onRequestClose={ModalManager.close}
            effect={Effect.Fall}
          >
            <h1>Confirm Payment</h1>
            <h2>Pay {amount(props.loans)}?</h2>
            <button onClick={async () => {
              await props.payEmi();
              ModalManager.close();
            }}
            >Pay
            </button>
            <button onClick={ModalManager.close}>Cancel</button>
          </Modal>
        ));
      }}
    >
      Pay EMI
    </button>
  </div>
);

export default Emi;
