import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import logo from './logo.svg';
import './App.css';

const CANVAS_SIZE = 1000;
const SPRING_PARAM = { stiffness: 60, damping: 9 };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbHiders: 12,
            shapeSize: 300,
            hiderSize: 50,
            hiderBorderRadius: 0
        };
        setInterval(this.randomize, 2000);
    }

    randomize = () => {
        const shapeSize = Math.round(Math.random() * 400) + 150;
        const hiderSize = Math.round(Math.random() * shapeSize / 3 + 5);
        this.setState({
            hiderSize: Math.random() * shapeSize / 3 + 20,
            shapeSize,
            nbHiders: Math.round(Math.random() * 12) + 5,
            hiderBorderRadius: Math.round(Math.random() * 50)
        });
    };

    placeShape(size) {
        const offset = (CANVAS_SIZE - size) / 2;
        return {
            width: spring(this.state.shapeSize, SPRING_PARAM),
            height: spring(this.state.shapeSize, SPRING_PARAM),
            top: spring(offset),
            left: spring(offset)
        };
    }

    placeHider(hiderSize, hiderBorderRadius) {
        const offset = (CANVAS_SIZE - hiderSize) / 2;
        return {
            width: spring(hiderSize, SPRING_PARAM),
            height: spring(hiderSize, SPRING_PARAM),
            borderRadius: spring(hiderBorderRadius, SPRING_PARAM),
            top: offset,
            left: offset
        };
    }

    renderHiders({
        offset,
        offsetRotation,
        nbHiders,
        hiderSize,
        hiderBorderRadius
    }) {
        const { shapeSize } = this.state;

        const rotateStep = 360 / nbHiders;

        return Array(nbHiders)
            .fill()
            .map((val, index) => (
                <Motion
                    defaultStyle={{ width: 0, height: 0, borderRadius: 0 }}
                    style={this.placeHider(hiderSize, hiderBorderRadius)}
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
    }

    render() {
        const {
            nbHiders,
            hiderSize,
            shapeSize,
            hiderBorderRadius
        } = this.state;

        return (
            <div className="App">
                <div
                    className="container"
                    style={{
                        width: CANVAS_SIZE,
                        height: CANVAS_SIZE
                    }}
                >
                    {this.renderHiders({
                        offset: shapeSize / 2,
                        offsetRotation: Math.random() * 100,
                        nbHiders: Math.round(Math.random() * 10 + 5),
                        hiderBorderRadius: Math.round(Math.random() * 50),
                        hiderSize: Math.random() * shapeSize / 3 + 20
                    })}
                    {this.renderHiders({
                        offset: shapeSize / 4,
                        offsetRotation: Math.random() * 100,
                        nbHiders: Math.round(Math.random() * 5 + 5),
                        hiderBorderRadius: Math.round(Math.random() * 50),
                        hiderSize: Math.random() * shapeSize / 5 + 10
                    })}

                    <Motion
                        defaultStyle={{ top: 0, left: 0, width: 0, height: 0 }}
                        style={this.placeShape(shapeSize)}
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
                </div>
            </div>
        );
    }
}

export default App;
