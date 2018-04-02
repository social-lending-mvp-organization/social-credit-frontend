import React from 'react';
import { PropTypes } from 'prop-types';

import { twitter } from '../../lib/constants';
import fetchHelper from '../../lib/fetch-helper';

import './NetworkGraph.css';
import * as styles from './NetworkGraph.style';

const { d3 } = window;

class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: undefined,
    };
  }

  componentDidMount = async () => {
    const width = 500;
    const height = 300;

    const json = await fetchHelper(`/api/users/twitterGraph?screenName=${this.props.screenName}`, {});

    const svg = d3.select('#canvas')
      .attr('width', width)
      .attr('height', height);

    const force = d3.layout.force()
      .gravity(0.0025)// .05)
      .distance(30)
      .charge(-6)
      .size([width, height]);
    force
      .nodes(json.nodes)
      .start();

    const node = svg.selectAll('.node')
      .data(json.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', `translate(${width / 2},${height / 2}) `)
      .call(force.drag);

    const circle = node.append('circle')
      .attr('r', '25')
      .attr('fill', d => `url(#node${d.group}) `)
      .style('stroke', (r) => {
        if (json.links[r.group - 1] !== undefined) {
          if (r.group - 1 === 0) {
            return 'grey';
          }
          if (json.links[r.group - 1].weight < 20) {
            return 'yellow';
          } else if (json.links[r.group - 1].weight < 50) {
            return 'blue';
          } else if (json.links[r.group - 1].weight < 100) {
            return 'orange';
          } else if (json.links[r.group - 1].weight < 200) {
            return 'aqua';
          } else if (json.links[r.group - 1].weight < 500) {
            return 'pink';
          } else if (json.links[r.group - 1].weight < 1000) {
            return 'magenta';
          } else if (json.links[r.group - 1].weight < 5000) {
            return 'green';
          }
        } return 'brown';
      });
    circle.append('svg:title')
      .text(d => d.name)
      .style('stroke-width', '4');
    force.on('tick', () => {
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    this.setState({
      graph: json,
    });
  }

  getAllPatterns = () => (this.state.graph ?
    this.state.graph.nodes.map(node =>
      this.patternDefinitionTemplate(node.group, node.photo))
    :
    null);

  patternDefinitionTemplate = (id, uri) => (
    <defs key={id}>
      <pattern x="25" y="25" id={`node${id}`} patternUnits="userSpaceOnUse" height="50" width="50">
        <image object-fit="cover" height="50" width="50" href={uri} />
      </pattern>
    </defs>
  )

  render = () => (
    <div style={styles.NetworkGraph} >
      <svg id="canvas" height={240} className="NetworkGraph-canvas">
        {this.getAllPatterns()}
      </svg>
      <div className="color-bar" />
      <p> Number of followers <i className="fas fa-arrow-right" /></p>
    </div>
  )
}

NetworkGraph.propTypes = {
  screenName: PropTypes.string.isRequired,
};

export default NetworkGraph;
