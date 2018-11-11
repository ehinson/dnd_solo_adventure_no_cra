import React, { Component } from 'react';

class Dice extends Component {
  roll = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
  }
  render() {
    return (
      <div className="Dice">
        <p className="App-intro">
          You rolled:
        </p>
        <p>{this.roll(6)}</p>
      </div>
    );
  }
}

export default Dice;
