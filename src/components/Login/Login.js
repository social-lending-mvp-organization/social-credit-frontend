import React from 'react';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { GridList, GridTile } from 'material-ui/GridList';

import './Login.css';
import lorem from '../../lorem.json';

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
      iconElementRight={<FlatButton label="Login" onClick={loginHandler} />}
    />

    <FloatingActionButton style={styles.fab} secondary>
      Login
    </FloatingActionButton>

    <GridList
      cellHeight={250}
      style={styles.gridList}
    >
      {[0, 1, 2, 3].map(id => (
        <GridTile
          key={id}
        >
          <Paper style={styles.paper} zDepth={3} >
            {lorem.ipsum.substring(0, 300)}
          </Paper>
        </GridTile>
      ))}
    </GridList>

  </div>
);

export default Login;
