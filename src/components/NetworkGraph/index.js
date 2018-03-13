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
    const json = await fetchHelper(`${twitter.twitterGraph}${this.props.screenName}`);
    const width = 960;
    const height = 500;
    const svg = d3.select('svg')// .append("svg")
      .attr('width', width)
      .attr('height', height);
    const force = d3.layout.force()
      .gravity(0)// .05)
      .distance(100)
      .charge(-5)
      .size([width, height]);
    force
      .nodes(json.nodes)
      .links(json.links)
      .start();

    const link = svg.selectAll('.link')
      .data(json.links)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke-width', d => Math.sqrt(d.weight));

    const node = svg.selectAll('.node')
      .data(json.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', `translate(${width / 2},${height / 2}) `)
      .call(force.drag);

    node.append('circle')
      .attr('r', '25')
      .attr('fill', d => `url(#node${d.group}) `);

    node.append('text')
      .attr('dx', -50)
      .attr('dy', -30)
      .text(d => d.name);

    force.on('tick', () => {
      link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

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
        <image height="50" width="50" href={uri} />
      </pattern>
    </defs >
  )

  render = () => (
    <div style={styles.NetworkGraph} >
      <svg id="canvas" width="1024" height="1024">
        {this.getAllPatterns()}

      </svg>
    </div>
  );
}

NetworkGraph.propTypes = {
  screenName: PropTypes.string.isRequired,
};

export default NetworkGraph;


/*
<!DOCTYPE html>
<meta charset="utf-8">
<script src="http://d3js.org/d3.v2.min.js?2.9.3"></script>
<style>
  .link {
    stroke: #aaa;
  }

  .node text {
    stroke: #333;
    cursor: pointer;
  }
</style>

<body>
  <svg id="canvas" width="1024" height="1024">


  </svg>
  <script>
    const template = (id, uri) => (`< defs >
      <pattern x="25" y="25" id="${id}" patternUnits="userSpaceOnUse" height="50" width="50">
        <image height="50" width="50" xlink: href="${uri}"></image>
      </pattern >
    </defs > `)

    var width = 960,
      height = 500

    var svg = d3.select("svg")//.append("svg")
      .attr("width", width)
      .attr("height", height);

    var force = d3.layout.force()
      .gravity(0)//.05)
      .distance(100)
      .charge(-5)
      .size([width, height]);

    d3.json("http://localhost:8080/api/users/twitterGraph?screenName=SouradeepNanda", function (json) {
      // d3.json('graphFile.json', function (json) {
      console.log(json)
      document.getElementById('canvas').innerHTML = json.nodes.map((node) => {
        return template(`node${ node.group } `, node.photo);
      }).join('\n');

      force
        .nodes(json.nodes)
        .links(json.links)
        .start();

      var link = svg.selectAll(".link")
        .data(json.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function (d) { return Math.sqrt(d.weight); });

      var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", `translate(${ width / 2},${height / 2}) `)
        .call(force.drag);

      node.append("circle")
        .attr("r", "25")
        .attr('fill', function (d) { return `url(#node${ d.group }) ` });

      node.append("text")
        .attr("dx", -50)
        .attr("dy", -30)
        .text(function (d) { return d.name });

      force.on("tick", function () {
        link.attr("x1", function (d) { return d.source.x; })
          .attr("y1", function (d) { return d.source.y; })
          .attr("x2", function (d) { return d.target.x; })
          .attr("y2", function (d) { return d.target.y; });

        node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
      });
    });

  </script>
  */
