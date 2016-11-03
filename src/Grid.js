import React, { Component } from 'react';

function renderItems(items, rows, cols, size, padding, onItemDown, onItemEnter) {
  rows = parseInt(rows, 10);
  cols = parseInt(cols, 10);
  let [currentRow, currentCol] = [0,0];
  return items.map((item, idx) => {
    const x = 0 + (size + padding) * currentCol;
    const y = 0 + (size + padding) * currentRow;
    const color = item.active ? item.color : '#000000';
    const style = { fill: color, border: 1 };
    currentCol++;
    if(currentCol === cols) {
      currentCol = 0;
      currentRow++;
    }
    return (
      <rect
        onMouseDown={onItemDown} onMouseEnter={onItemEnter}
        style={style} id={idx} key={idx}
        x={x} y={y} width={size} height={size}
      />
    );
  });
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
