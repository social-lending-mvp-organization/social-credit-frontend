import React from 'react';
import { PropTypes } from 'prop-types';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import './Login.css';

// Doesnt work when exported to CSS
const styles = {
  paper: {
    height: 250,
    width: 250,
    margin: 20,
    padding: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  gridList: {
    width: 600,
    height: 600,
    overflowY: 'auto',
  },
  fab: {
    marginRight: 20,
    marginTop: '75vh',
    float: 'right',
  },
};

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
        <pre className="Login-header">
          {'A new way to\napply for loans.'}
        </pre>
      </div>

    </div>
  );
}

Login.propTypes = {
  fbLoginClick: PropTypes.func.isRequired,
};

export default Login;
