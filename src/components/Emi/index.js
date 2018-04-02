import React from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

import * as styles from './Emi.style';
import './Emi.css';

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
        ModalManager.open((
          <Modal
            onRequestClose={ModalManager.close}
            effect={Effect.Fall}
          >
            <h1 className="Emi-Modal-Confirm">Confirm Payment</h1>
            <h2 className="Emi-Modal-Message">Pay {amount(props.loans)}?</h2>
            <button
onClick={async () => {
              await props.payEmi();
              ModalManager.close();
            }}
              className="Emi-Modal-Pay-Button"
            >Pay
            </button>
            <button
              className="Emi-Modal-Pay-Cancel"
              onClick={ModalManager.close}
            >Cancel
            </button>
          </Modal>
        ));
      }}
    >
      Pay EMI
    </button>
  </div>
);

export default Emi;
