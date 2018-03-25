import React from 'react';
import { PropTypes } from 'prop-types';
import d3 from './d3';

/* eslint no-use-before-define: 2 */
// ^ Turn eslint back on

import { twitter } from '../../lib/constants';
import fetchHelper from '../../lib/fetch-helper';

import './NetworkGraph.css';
import * as styles from './NetworkGraph.style';

class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    const width = 500;
    const height = 750;
    const svg = d3.select('svg')// .append("svg")
      .attr('width', width)
      .attr('height', height);
    const json = await fetchHelper(`${twitter.twitterGraph}${this.props.screenName}`);
    console.log(json);
    const images = json.nodes.map(eachNode => eachNode.photo);

    console.log(images);

    const force = d3.layout.force()
      .gravity(0.0025)// .05)
      .distance(30)
      .charge(-6)
      .size([width, height]);
    force
      .nodes(json.nodes)
      // .links(json.links)
      .start();

    // const link = svg.selectAll('.link')
    //   .data(json.links)
    //   .enter().append('line')
    //   .attr('class', 'link')
    //   .style('stroke-width', d => Math.sqrt(d.weight));

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
        // console.log(json.links[r.group].weight, r);
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
      .style('stroke-width', '2');
    force.on('tick', () => {
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
    this.setState({
      data: json,
    });
  }

  getAllPatterns = () => (this.state.data.nodes ?
    this.state.data.nodes.map(node =>
      this.patternDefinitionTemplate(node.group, node.photo))
    :
    null);

  patternDefinitionTemplate = (id, uri) => (
    <defs key={id}>
      <pattern x="25" y="25" id={`node${id}`} patternUnits="userSpaceOnUse" height="50" width="50">
        <image object-fit="cover" height="50" width="50" href={uri} />
      </pattern>
    </defs >
  )

  render = () => (<div style={styles.NetworkGraph} >
    <h1>YOUR FOLLOWERS!</h1>
    <svg id="canvas" width="1024" height="1024">
      {this.getAllPatterns()}
    </svg>
    <div className="color-bar" />
    <p> Number of followers -------------&gt; </p>
                  </div>

  )
}

NetworkGraph.propTypes = {
  screenName: PropTypes.string.isRequired,
};

export default NetworkGraph;
