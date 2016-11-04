import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import { setCurrentColor } from './actions';

const colors = [
  { active: true, color: '#FF0000'},
  { active: true, color: '#00FF00'},
  { active: true, color: '#0000FF'},
];

const propsPalette = {
  grid: colors, countRows: 1, countCols: 3, pixelSize: 15, padding: 1
};

class ColorPalette extends Component {
  handleOnItemDown = ev => {
    const { dispatch } = this.props;
    const color = colors[parseInt(ev.target.id, 10)].color;
    dispatch(setCurrentColor(color));
  }

  render() {
    return(
      <Grid {...propsPalette} onItemDown={this.handleOnItemDown} />
    );
  }
}

function select(state) {
  return {
    currentColor: state.color.currentColor,
  }
}

export default connect(select)(ColorPalette);
