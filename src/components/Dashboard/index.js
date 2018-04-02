import React from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Parallax from 'react-springy-parallax';

import Navigation from '../Navigation';
import ScoreCalc from '../ScoreCalc';
import YourScore from '../YourScore';
import Loans from '../Loans';
import Loading from '../Loading';

import './Dashboard.css';

import logo from '../../media/logo.svg';

import { signUpAuth } from '../../Auth';

class Dashboard extends React.Component {
  componentDidMount = async () => {
    const isAuthenticated = signUpAuth.isAuthenticate();
    console.log('login', isAuthenticated);
    if (isAuthenticated) {
      await this.props.login();
    }
  }

  render = () => {
    const isAuthenticated = signUpAuth.isAuthenticate();

    if (!isAuthenticated) {
      this.props.history.replace('/login');
      return null;
    }

    return (
      !this.props.isBusy.loaded ?
        <Loading
          title="Hold on"
          body={this.props.isBusy.message}
        />
        :
        <div style={{ height: '100%', overflowY: 'hidden' }}>
          <div className="Navbar">
            <Navigation navigate={layer => this.parallax.scrollTo(layer)} />
          </div>
          <div className="Layers">
            <Parallax
              ref={(ref) => { this.parallax = ref; }}
              pages={3}
              scrolling
            >
              <Parallax.Layer
                offset={0}
              >
                <div className="Layer1">
                  <div className="Layer1-container">
                    <YourScore
                      user={this.props.user}
                      connections={this.props.connections}
                    />
                  </div>
                </div>
              </Parallax.Layer>
              <Parallax.Layer
                offset={1}
              >
                {/*
            Request for a loan
            Pay emi
             */}
                <div className="Layer2">
                  <div className="Layer2-container">
                    <Loans
                      loans={this.props.loans}
                      applyForLoan={async (amount, installments) => {
                        await this.props.applyForLoan(amount, installments);
                      }}
                      payEmi={async () => {
                        await this.props.payEmi();
                      }}
                    />
                  </div>
                </div>
              </Parallax.Layer>
              <Parallax.Layer
                offset={2}
              >
                <div className="Layer3">
                  <div className="Layer3-container">
                    <ScoreCalc />
                  </div>
                </div>
              </Parallax.Layer>
            </Parallax>
          </div>
        </div>
    );
  }
}

export default withRouter(Dashboard);
