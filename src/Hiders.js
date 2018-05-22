import React from 'react';
import { Motion, spring } from 'react-motion';

const SPRING_PARAM = { stiffness: 60, damping: 9 };
const Hiders = ({
  shapeSize,
  offset,
  offsetRotation,
  nbHiders,
  hiderSize,
  hiderBorderRadius,
  hiderBorderRadius2
}) => {
  const rotateStep = 360 / nbHiders;
  const centerX = (shapeSize - hiderSize) / 2;
  const centerY = (shapeSize - hiderSize) / 2;

  return Array(nbHiders)
    .fill()
    .map((val, index) => (
      <Motion
        key={index}
        defaultStyle={{
          width: 0,
          height: 0,
          borderRadius: 0,
          top: centerY,
          left: centerX
        }}
        style={{
          width: spring(hiderSize, SPRING_PARAM),
          height: spring(hiderSize, SPRING_PARAM),
          borderRadius: spring(hiderBorderRadius, SPRING_PARAM),
          top: centerY,
          left: centerX
        }}
      >
        {interpolatingStyle => (
          <div
            className="hider"
            style={{
              ...interpolatingStyle,
              transform: `rotate(${index * rotateStep +
                offsetRotation}deg) translate(-${offset}px)`
            }}
          />
        )}
      </Motion>
    ));
};

export default Hiders;
