import React from 'react';

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

const loginHandler = () => {
  alert('LOGIN');
};

const Login = () => (
  <div className="Login" >
    <AppBar
      title="Social Credit"
      showMenuIconButton={false}
      iconElementRight={<FlatButton label="Login" onClick={loginHandler} />}
    />

    <div
      className="Login-jumbotron"
    >
      A new way to apply for loans
    </div>

  </div>
);

export default Login;
