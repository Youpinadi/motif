import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import random from 'lodash.random';
import randomColor from 'randomcolor';
import { WindowSize } from 'react-fns';
import './App.css';

const CANVAS_SIZE = window.innerHeight;
const SPRING_PARAM = { stiffness: 60, damping: 9 };

const CentralShape = ({ appDimensions, size, color, children }) => {
  const { width, height } = appDimensions;
  const centerX = (width - size) / 2;
  const centerY = (height - size) / 2;

  return (
    <Motion
      defaultStyle={{ top: 0, left: 0, width: 0, height: 0 }}
      style={{
        width: spring(size, SPRING_PARAM),
        height: spring(size, SPRING_PARAM),
        top: spring(centerY),
        left: spring(centerX)
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
  // const { width, height } = appDimensions;
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
      shapeColor: randomColor({
        luminosity: 'bright'
      })
    });
  };

  renderApp = ({ width, height }) => {
    const { shapeColor } = this.state;
    const appSize = Math.min(width, height);
    const shapeSize = random(appSize / 3, appSize / 2);

    return (
      <div className="App">
        <div
          className="container"
          style={{
            width,
            height
          }}
        >
          <CentralShape
            appDimensions={{ width, height }}
            size={shapeSize}
            color={shapeColor}
          >
            <Hiders
              shapeSize={shapeSize}
              offset={shapeSize / 2}
              offsetRotation={random(100)}
              nbHiders={random(10, 15)}
              hiderBorderRadius={random(shapeSize / 3) + 10}
              hiderBorderRadius2={random(shapeSize / 3) + 10}
              hiderSize={random(shapeSize / 3) + 10}
            />
            <Hiders
              shapeSize={shapeSize}
              offset={shapeSize / 4}
              offsetRotation={random(100)}
              nbHiders={random(5, 10)}
              hiderBorderRadius={random(50)}
              hiderBorderRadius2={random(50)}
              hiderSize={random(shapeSize / 10) + 5}
            />
          </CentralShape>
        </div>
      </div>
    );
  };

  render() {
    return <WindowSize render={this.renderApp} />;
  }
}

export default App;
