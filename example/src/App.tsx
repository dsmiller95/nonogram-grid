import React from 'react';

import { PixelDisplay, GridDumb, GridKeys } from 'nonogram-grid';

import 'nonogram-grid/dist/index.css';

const App = () => {
  const fullGrid = [
    [
      PixelDisplay.Black,
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.White,
      PixelDisplay.Black
    ],
    [
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.Black
    ],
    [
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.White
    ],
    [
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.Black
    ],
    [
      PixelDisplay.Black,
      PixelDisplay.Black,
      PixelDisplay.White,
      PixelDisplay.White,
      PixelDisplay.White
    ],
    [
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.White
    ]
  ];
  return (
    <div style={{ width: 300, height: 300 }}>
      <GridKeys pixels={fullGrid}>
        <GridDumb
          pixels={fullGrid}
          editable={true}
          dragStart={(col: number, row: number) => {
            console.log(`Drag start row:${row} col:${col}`);
          }}
          onDrag={(col: number, row: number) => {
            console.log(`Dragged on row:${row} col:${col}`);
          }}
        ></GridDumb>
      </GridKeys>
    </div>
  );
};

export default App;
