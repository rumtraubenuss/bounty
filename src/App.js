import React, { Component } from 'react';
import './App.css';
import rRepeat from 'ramda/src/repeat';
import rFlatten from 'ramda/src/flatten';

let grid = [];

function getItem(row, col) {
  const x = 0 + 10.1 * col;
  const y = 0 + 10.1 * row;
  return { x, y, active: false }
}

function getGrid(countRows = 10, countCols = 10) {
  grid = rRepeat([], countRows).map((row, idxRow) => {
    return rRepeat([], countCols).map((col, idxCol) => {
      return getItem(idxRow, idxCol);
    });
  });
  grid = rFlatten(grid);
  return grid;
}

class App extends Component {
  constructor() {
    super();
    this.state = { inputRows: 10, inputCols: 10, grid: getGrid() };
  }

  setGrid = ({ target, target: { value } }) => {
    const newState = { ...this.state };
    newState[target.id] = value;
    newState.grid = getGrid(newState.inputRows, newState.inputCols);
    this.setState(newState);
  }

  handleItemClick = ({ target }) => {
    const grid = [...this.state.grid];
    grid[parseInt(target.id, 10)].active = !grid[parseInt(target.id, 10)].active;
    this.setState({ grid });
  }

  render() {
    const items = this.state.grid.map(({ x, y, active }, idx) => {
      const col = active ? '#FF0000' : '#000000';
      const style = { fill: col, border: 1 };
      return <rect style={style} onClick={this.handleItemClick} id={idx} key={idx}
                x={x} y={y} width="10" height="10"
              />
    });
    return (
      <div className="App">
        <input id="inputRows" value={this.state.inputRows} onChange={this.setGrid} type="text"/>
        <input id="inputCols" value={this.state.inputCols} onChange={this.setGrid} type="text"/>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 500 500`}>
            {items}
          </svg>
        </p>
      </div>
    );
  }
}

export default App;
