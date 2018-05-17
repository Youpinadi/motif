import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import random from 'lodash.random';
import './App.css';

const CANVAS_SIZE = window.innerHeight;
const SPRING_PARAM = { stiffness: 60, damping: 9 };

const CentralShape = ({ size }) => {
  const center = (CANVAS_SIZE - size) / 2;

  return (
    <Motion
      defaultStyle={{ top: 0, left: 0, width: 0, height: 0 }}
      style={{
        width: spring(size, SPRING_PARAM),
        height: spring(size, SPRING_PARAM),
        top: spring(center),
        left: spring(center)
      }}
    >
      {interpolatingStyle => (
        <div
          className="shape"
          style={{
            ...interpolatingStyle
          }}
        />
      )}
    </Motion>
  );
};

const Hiders = ({
  shapeSize,
  offset,
  offsetRotation,
  nbHiders,
  hiderSize,
  hiderBorderRadius
}) => {
  const rotateStep = 360 / nbHiders;
  const center = (CANVAS_SIZE - hiderSize) / 2;

  return Array(nbHiders)
    .fill()
    .map((val, index) => (
      <Motion
        key={index}
        defaultStyle={{
          width: 0,
          height: 0,
          borderRadius: 0,
          top: center,
          left: center
        }}
        style={{
          width: spring(hiderSize, SPRING_PARAM),
          height: spring(hiderSize, SPRING_PARAM),
          borderRadius: spring(hiderBorderRadius, SPRING_PARAM),
          top: center,
          left: center
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeSize: 300
    };
  }

  componentDidMount() {
    setInterval(this.randomize, 2000);
  }

  randomize = () => {
    this.setState({
      shapeSize: random(150, 500)
    });
  };

  render() {
    const { shapeSize } = this.state;

    return (
      <div className="App">
        <div
          className="container"
          style={{
            width: CANVAS_SIZE,
            height: CANVAS_SIZE
          }}
        >
          <Hiders
            shapeSize={shapeSize}
            offset={shapeSize / 2}
            offsetRotation={random(100)}
            nbHiders={random(10, 15)}
            hiderBorderRadius={random(50)}
            hiderSize={random(shapeSize / 3) + 10}
          />
          <Hiders
            shapeSize={shapeSize}
            offset={shapeSize / 4}
            offsetRotation={random(100)}
            nbHiders={random(5, 10)}
            hiderBorderRadius={random(50)}
            hiderSize={random(shapeSize / 10) + 5}
          />
          <CentralShape size={shapeSize} />
        </div>
      </div>
    );
  }
}

export default App;
