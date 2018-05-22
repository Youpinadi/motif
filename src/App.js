import React, { Component } from 'react';
import { WindowSize } from 'react-fns';

import Cog from './Cog';

import './App.css';

class App extends Component {
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

        cogs.push(<Cog x={x} y={y} size={shapeSize} />);
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
