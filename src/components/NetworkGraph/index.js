import React from 'react';
import { PropTypes } from 'prop-types';

/* eslint no-use-before-define: 2 */
// ^ Turn eslint back on

import { twitter } from '../../lib/constants';
import fetchHelper from '../../lib/fetch-helper';

import './NetworkGraph.css';
import * as styles from './NetworkGraph.style';

const { d3 } = window;

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
    // const json = await fetchHelper(`${twitter.twitterGraph}${this.props.screenName}`);
    const json =
    {
      nodes: [
        {
          name: 'Sahu S',
          photo: 'http://pbs.twimg.com/profile_images/876061295543435264/-dAn61TE_normal.jpg',
          group: 0,
        },
        {
          name: 'Consultancy.in',
          photo: 'http://pbs.twimg.com/profile_images/912282471886200833/AbDmfW7u_normal.jpg',
          group: 1,
        },
        {
          name: 'Yash Shukla',
          photo: 'http://pbs.twimg.com/profile_images/918883503114043392/fhBpe8gy_normal.jpg',
          group: 2,
        },
        {
          name: 'hitesh nettam',
          photo: 'http://pbs.twimg.com/profile_images/873752888895430657/GyLLHdfh_normal.jpg',
          group: 3,
        },
        {
          name: 'Neha_khan',
          photo: 'http://pbs.twimg.com/profile_images/858579747152044032/5djwGGdW_normal.jpg',
          group: 4,
        },
        {
          name: 'Medha Yadav',
          photo: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          group: 5,
        },
        {
          name: 'Shreyas Raj Reddy',
          photo: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          group: 6,
        },
        {
          name: 'Tushar Das',
          photo: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          group: 7,
        },
        {
          name: 'KING GURU',
          photo: 'http://pbs.twimg.com/profile_images/823168779060465665/Ob2yAq9K_normal.jpg',
          group: 8,
        },
        {
          name: 'Akshay Kunder',
          photo: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          group: 9,
        },
        {
          name: 'Sudheendra',
          photo: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          group: 10,
        },
        {
          name: 'Vignesh B',
          photo: 'http://pbs.twimg.com/profile_images/822786803488813057/ekHwrHow_normal.jpg',
          group: 11,
        },
        {
          name: "Ciaran O'Brien",
          photo: 'http://pbs.twimg.com/profile_images/3316981743/3d0d4acb03f2f1b5ce0a6d4c0ced6882_normal.jpeg',
          group: 12,
        },
        {
          name: 'Ravi Hegde',
          photo: 'http://pbs.twimg.com/profile_images/714512231258521600/yXv0mEcB_normal.jpg',
          group: 13,
        },
        {
          name: 'Meghna Kar',
          photo: 'http://pbs.twimg.com/profile_images/584392329684848641/9Hzf2Isa_normal.jpg',
          group: 14,
        },
        {
          name: 'Ritesh Shetty',
          photo: 'http://pbs.twimg.com/profile_images/842247962558324737/151e47m6_normal.jpg',
          group: 15,
        },
        {
          name: 't. vignesh prabhu',
          photo: 'http://pbs.twimg.com/profile_images/513650024677249026/9Bd3t8i2_normal.png',
          group: 16,
        },
        {
          name: 'Amit kumar dixit',
          photo: 'http://pbs.twimg.com/profile_images/437667684260384768/rw44XC4t_normal.jpeg',
          group: 17,
        },
        {
          name: 'MireilleBovino',
          photo: 'http://pbs.twimg.com/profile_images/378800000777761549/c92cb4594c4794eed5d3ea52b884140b_normal.jpeg',
          group: 18,
        },
        {
          name: 'Sathvik Anand',
          photo: 'http://pbs.twimg.com/profile_images/378800000568194545/9130a53e81ef0e599b34de26e6032f62_normal.jpeg',
          group: 19,
        },
        {
          name: 'MRINMAY',
          photo: 'http://pbs.twimg.com/profile_images/812877213720834048/mgC4vQVc_normal.jpg',
          group: 20,
        },
      ],
      links: [
        {
          source: 0,
          target: 1,
          weight: 178,
        },
        {
          source: 0,
          target: 2,
          weight: 6,
        },
        {
          source: 0,
          target: 3,
          weight: 22,
        },
        {
          source: 0,
          target: 4,
          weight: 11,
        },
        {
          source: 0,
          target: 5,
          weight: 6,
        },
        {
          source: 0,
          target: 6,
          weight: 21,
        },
        {
          source: 0,
          target: 7,
          weight: 7,
        },
        {
          source: 0,
          target: 8,
          weight: 7,
        },
        {
          source: 0,
          target: 9,
          weight: 3,
        },
        {
          source: 0,
          target: 10,
          weight: 26,
        },
        {
          source: 0,
          target: 11,
          weight: 245,
        },
        {
          source: 0,
          target: 12,
          weight: 470,
        },
        {
          source: 0,
          target: 13,
          weight: 21,
        },
        {
          source: 0,
          target: 14,
          weight: 58,
        },
        {
          source: 0,
          target: 15,
          weight: 406,
        },
        {
          source: 0,
          target: 16,
          weight: 673,
        },
        {
          source: 0,
          target: 17,
          weight: 32,
        },
        {
          source: 0,
          target: 18,
          weight: 83,
        },
        {
          source: 0,
          target: 19,
          weight: 11,
        },
        {
          source: 0,
          target: 20,
          weight: 67,
        },
      ],
    };
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
