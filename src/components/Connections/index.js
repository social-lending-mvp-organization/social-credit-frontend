import React from 'react';
import { Grid } from 'react-bootstrap';

class Connections extends React.Component {
  render = () => (
    <Grid>
      Connections
      <hr />
      {JSON.stringify(this.props.connections, null, 2)}
    </Grid>
  );
}

export default Connections;
