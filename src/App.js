import React from 'react';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

// import logo from './media/logo.svg';
import './css/App.css';
import Login from './Login';
import Dashboard from './Dashboard';

class App extends React.Component {
  static getTitleBar() {
    return (
      <Grid>
        <PageHeader>
          <Row className="show-grid">
            <Col xs={4} md={4} >
              <span>Social credit</span>
            </Col>
            <Col xs={8} md={8} >
              <small>Placeholder description</small>
            </Col>
          </Row>
        </PageHeader>
      </Grid>
    );
  }

  static getBody() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={8} md={8} >
            <Dashboard isLoggedIn={false} />
          </Col>
          <Col xs={4} md={4} >
            <Login isLoggedIn={false} />
          </Col>
        </Row>
      </Grid>
    );
  }

  constructor(props) {
    super(props);
    this.isLoggedIn = false;
  }


  render() {
    return (
      <div className="app-wrapper">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12} >
              {App.getTitleBar()}
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12} >
              {App.getBody()}
            </Col>
          </Row>
        </Grid>
      </div >
    );
  }
}

export default App;
