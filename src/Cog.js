import React from 'react';
import random from 'lodash.random';

import CentralShape from './CentralShape';
import Hiders from './Hiders';

const Cog = ({ x, y, size, color }) => (
  <CentralShape x={x} y={y} size={size} color={color}>
    <Hiders
      shapeSize={size}
      offset={size / 2}
      offsetRotation={random(100)}
      nbHiders={random(10, 15)}
      hiderBorderRadius={random(size / 3) + 10}
      hiderBorderRadius2={random(size / 3) + 10}
      hiderSize={random(size / 3) + 10}
    />
    <Hiders
      shapeSize={size}
      offset={size / 4}
      offsetRotation={random(100)}
      nbHiders={random(5, 10)}
      hiderBorderRadius={random(50)}
      hiderBorderRadius2={random(50)}
      hiderSize={random(size / 10) + 5}
    />
  </CentralShape>
);

export default Cog;
