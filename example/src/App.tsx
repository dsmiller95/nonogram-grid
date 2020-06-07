import React from 'react';

import { PixelDisplay, GridDumb } from 'nonogram-grid';
import 'nonogram-grid/dist/index.css';

const App = () => {
  const fullGrid = new Array(10)
    .fill(undefined)
    .map(() =>
      new Array(10)
        .fill(undefined)
        .map(() =>
          Math.random() > 0.5 ? PixelDisplay.Black : PixelDisplay.White
        )
    );
  return (
    <div>
      <div className='grid-container'>
        <GridDumb
          pixels={fullGrid}
          editable={true}
          dragStart={(col: number, row: number) => {
            console.log(`Drag start row:${row} col:${col}`);
          }}
          onDrag={(col: number, row: number) => {
            console.log(`Drag start row:${row} col:${col}`);
          }}
        ></GridDumb>
      </div>
    </div>
  );
};

export default App;
