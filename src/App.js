import React, { Component } from 'react';
import './App.css';
import rRepeat from 'ramda/src/repeat';
import rFlatten from 'ramda/src/flatten';
import Grid from './Grid';

let grid = [];
const itemW = 20;
const itemH = 20;
const itemP = 1;
const gridDefaultRows = 10;
const gridDefaultCols = 30;
const ITEM_ACTIVATE = 'itemActivate';
const ITEM_DEACTIVATE = 'itemDeActivate';

function getItem(row, col) {
  const x = 0 + (itemW + itemP) * col;
  const y = 0 + (itemH + itemP) * row;
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
    const items = this.state.grid.map(({ x, y, active }, idx) => {
      const col = active ? '#FFFFFF' : '#000000';
      const style = { fill: col, border: 1 };
      return (
        <rect
          onMouseDown={this.handleItemDown} onMouseEnter={this.handleItemEnter}
          style={style} id={idx} key={idx}
          x={x} y={y} width={itemW} height={itemH}
        />
      )
    });
    const canvasW = this.state.inputCols * (itemW + itemP) - itemP;
    const canvasH = this.state.inputRows * (itemH + itemP) - itemP;
    const styleCanvas = { backgroundColor: 'red', width: `${canvasW}px`, height: `${canvasH}px` };
    const propsGrid = {
      grid, countRows: this.state.inputRows, countCols: this.state.inputCols,
      pixelSize: 3, padding: 0 };
    return (
      <div className="App">
        <input id="inputRows" value={this.state.inputRows} onChange={this.setGrid} type="text"/>
        <input id="inputCols" value={this.state.inputCols} onChange={this.setGrid} type="text"/>
        <Grid {...propsGrid} />
        <p>
          <svg
            onMouseDown={this.handleCanvasDown} onMouseUp={this.handleCanvasUp}
            style={styleCanvas} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${canvasW} ${canvasH}`}
          >
            {items}
          </svg>
        </p>
      </div>
    );
  }
}

export default App;
