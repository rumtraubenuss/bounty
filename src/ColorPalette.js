import React, { Component } from 'react';
import Grid from './Grid';

const colors = [
  { active: true, color: '#FF0000'},
  { active: true, color: '#00FF00'},
  { active: true, color: '#0000FF'},
];

function handleOnItemDown(ev) {
  console.log(colors[parseInt(ev.target.id, 10)].color);
}

const propsPalette = {
  onItemDown: handleOnItemDown,
  grid: colors, countRows: 1, countCols: 3, pixelSize: 15, padding: 1 };

class ColorPalette extends Component {
  render() {
    return(
      <Grid {...propsPalette} />
    );
  }
}

export default ColorPalette;
