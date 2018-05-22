import React from 'react';
import { Motion, spring } from 'react-motion';

const SPRING_PARAM = { stiffness: 60, damping: 9 };
const CentralShape = ({ x, y, size, color, children }) => {
  return (
    <Motion
      defaultStyle={{ top: 0, left: 0, width: 0, height: 0 }}
      style={{
        width: spring(size, SPRING_PARAM),
        height: spring(size, SPRING_PARAM),
        top: spring(y),
        left: spring(x)
      }}
    >
      {interpolatingStyle => (
        <div
          className="shape"
          style={{
            ...interpolatingStyle,
            backgroundColor: color
          }}
        >
          {children}
        </div>
      )}
    </Motion>
  );
};

export default CentralShape;
