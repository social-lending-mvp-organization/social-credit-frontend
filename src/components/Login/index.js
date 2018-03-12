import React from 'react';
import { PropTypes } from 'prop-types';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import './Login.css';

class Login extends React.Component {
  componentDidMount() {

  }

  render = () => (
    <div className="Login" >
      <AppBar
        title="Social-Credit"
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Login" onClick={() => this.props.fbLoginClick()} />}
      />
      <div
        className="Login-jumbotron"
      >

        <h1 className="Login-header">
          {'A new way to apply for loans.'}
        </h1>
      </div>

    </div>
  );
}

Login.propTypes = {
  fbLoginClick: PropTypes.func.isRequired,
};

export default Login;
