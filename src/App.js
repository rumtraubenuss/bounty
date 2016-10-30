import React, { Component } from 'react';
import './App.css';
import rRepeat from 'ramda/src/repeat';
import rFlatten from 'ramda/src/flatten';
import Grid from './Grid';

let grid = [];
const gridDefaultRows = 10;
const gridDefaultCols = 30;
const ITEM_ACTIVATE = 'itemActivate';
const ITEM_DEACTIVATE = 'itemDeActivate';

function getGrid(countRows = 10, countCols = 10) {
  grid = rRepeat([], countRows).map((row, idxRow) => {
    return rRepeat([], countCols).map((col, idxCol) => {
      return { active: false, color: '#FF0000' }
    });
  });
  grid = rFlatten(grid);
  return grid;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputRows: gridDefaultRows,
      inputCols: gridDefaultCols,
      grid: getGrid(gridDefaultRows, gridDefaultCols),
      mouseDown: false,
      itemStartAction: undefined,
    };
  }

  setGrid = ({ target, target: { value } }) => {
    const newState = { ...this.state };
    newState[target.id] = value;
    newState.grid = getGrid(newState.inputRows, newState.inputCols);
    this.setState(newState);
  }

  handleItemDown = ({ target }) => {
    const grid = [...this.state.grid];
    const itemStartAction = grid[parseInt(target.id, 10)].active ? ITEM_DEACTIVATE : ITEM_ACTIVATE;
    if(this.state.itemStartAction === undefined) {
      this.setState({ itemStartAction });
    }
    this.changeItem(target, itemStartAction);
  }

  handleItemEnter = ev => {
    if(this.state.mouseDown) {
      this.changeItem(ev.target, this.state.itemStartAction);
    }
  }

  handleCanvasDown = () => {
    this.setState({ mouseDown: true });
  }

  handleCanvasUp = () => {
    this.setState({ mouseDown: false, itemStartAction: undefined });
  }

  changeItem = (target, action) => {
    const grid = [...this.state.grid];
    if(action === ITEM_ACTIVATE) {
      grid[parseInt(target.id, 10)].active = true;
    } else {
      grid[parseInt(target.id, 10)].active = false;
    }
    this.setState({ grid });
  }

  render() {
    const propsGridEditor = {
      grid, countRows: this.state.inputRows, countCols: this.state.inputCols,
      pixelSize: 20, padding: 1,
      onCanvasDown: this.handleCanvasDown, onCanvasUp: this.handleCanvasUp,
      onItemDown: this.handleItemDown, onItemEnter: this.handleItemEnter
    };
    const propsGridPreview = {
      grid, countRows: this.state.inputRows, countCols: this.state.inputCols,
      pixelSize: 3, padding: 0
    };
    return (
      <div className="App">
        <input id="inputRows" value={this.state.inputRows} onChange={this.setGrid} type="text"/>
        <input id="inputCols" value={this.state.inputCols} onChange={this.setGrid} type="text"/>
        <p>
          <Grid {...propsGridEditor} />
        </p>
        <p>
          <Grid {...propsGridPreview} />
        </p>
      </div>
    );
  }
}

export default App;
