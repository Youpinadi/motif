import React, { Component } from 'react';
import randomColor from 'randomcolor';
import { WindowSize } from 'react-fns';

import Cog from './Cog';

import './App.css';

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

  renderCogs(width, height) {
    const cols = 3;
    const rows = 2;
    const tileWidth = width / cols;
    const tileHeight = height / rows;

    const shapeSize = Math.min(tileWidth, tileHeight) - 50;

    let cogs = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * tileWidth;
        const y = j * tileHeight;

        cogs.push(
          <Cog
            x={x}
            y={y}
            onClick={this.randomize}
            size={shapeSize}
            color={randomColor({
              luminosity: 'bright'
            })}
          />
        );
      }
    }
    return cogs;
  }

  renderApp = ({ width, height }) => {
    return (
      <div className="App">
        <div
          className="container"
          style={{
            width,
            height
          }}
        />
        {this.renderCogs(width, height)}
      </div>
    );
  };

  render() {
    return <WindowSize render={this.renderApp} />;
  }
}

export default App;
