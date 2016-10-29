import React, { Component } from 'react';

function renderItems(items, rows, cols, size, padding, onItemDown, onItemEnter) {
  rows = parseInt(rows, 10);
  cols = parseInt(cols, 10);
  const tmpItems = [];
  let [currentRow, currentCol] = [0,0];
  for(let i = 0; i < rows * cols; i++) {
    const x = 0 + (size + padding) * currentCol;
    const y = 0 + (size + padding) * currentRow;
    const color = items[i].active ? items[i].color : '#000000';
    const style = { fill: color, border: 1 };
    tmpItems.push(
      <rect
        onMouseDown={onItemDown} onMouseEnter={onItemEnter}
        style={style} id={i} key={i}
        x={x} y={y} width={size} height={size}
      />
    );
    currentCol++;
    if(currentCol === cols) {
      currentCol = 0;
      currentRow++;
    }
  }
  return tmpItems;
}

class Grid extends Component {
  render() {
    const {
      grid, countRows, countCols, pixelSize, padding,
      onItemDown, onItemEnter, onCanvasDown, onCanvasUp } = this.props;
    const canvasW = countCols * (pixelSize + padding) - padding;
    const canvasH = countRows * (pixelSize + padding) - padding;
    const styleCanvas = { backgroundColor: 'red', width: `${canvasW}px`, height: `${canvasH}px` };
    const items = renderItems(grid, countRows, countCols, pixelSize, padding, onItemDown, onItemEnter);
    return(
      <svg
        onMouseDown={onCanvasDown} onMouseUp={onCanvasUp}
        style={styleCanvas} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${canvasW} ${canvasH}`}
      >
        {items}
      </svg>
    );
  }
}

export default Grid;
