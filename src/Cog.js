import React, { Component } from 'react';
import randomColor from 'randomcolor';
import random from 'lodash.random';

import CentralShape from './CentralShape';
import Hiders from './Hiders';

class Cog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: randomColor({
        luminosity: 'bright'
      })
    };
  }

  reload = () => {
    this.setState({
      color: randomColor({
        luminosity: 'bright'
      })
    });
  };

  render() {
    const { x, y, size } = this.props;
    const { color } = this.state;

    return (
      <div onClick={this.reload}>
        <CentralShape x={x} y={y} size={size} color={color}>
          <Hiders
            size={size}
            offset={size / 2}
            offsetRotation={random(100)}
            nbHiders={random(10, 15)}
            hiderBorderRadius={random(size / 3) + 10}
            hiderBorderRadius2={random(size / 3) + 10}
            hiderSize={random(size / 3) + 10}
          />
          <Hiders
            size={size}
            offset={size / 4}
            offsetRotation={random(100)}
            nbHiders={random(5, 10)}
            hiderBorderRadius={random(50)}
            hiderBorderRadius2={random(50)}
            hiderSize={random(size / 10) + 5}
          />
        </CentralShape>
      </div>
    );
  }
}

export default Cog;
