import React from 'react';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

// import logo from './media/logo.svg';
import './css/App.css';
import Login from './components/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fbLoginClickHandler = this.fbLoginClickHandler.bind(this);

    this.state = {
      isLoggedIn: false,
    };
  }

  getTitleBar() {
    const secondaryText = this.state.isLoggedIn ? 'Welcome back' : '';
    return (
      <Grid>
        <PageHeader>
          <Row className="show-grid">
            <Col xs={4} md={4} >
              <span>Social credit</span>
            </Col>
            <Col xs={8} md={8} >
              <small>{secondaryText}</small>
            </Col>
          </Row>
        </PageHeader>
      </Grid>
    );
  }

  getBody() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={8} md={8} >
            <Dashboard isLoggedIn={this.state.isLoggedIn} />
          </Col>
          <Col xs={4} md={4} >
            <Login isLoggedIn={this.state.isLoggedIn} fbLoginClickHandler={this.fbLoginClickHandler} />
          </Col>
        </Row>
      </Grid>
    );
  }

  fbLoginClickHandler() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12} >
              {this.getTitleBar()}
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12} >
              {this.getBody()}
            </Col>
          </Row>
        </Grid>
      </div >
    );
  }
}

export default App;
