import React from 'react';

import { PixelDisplay, GridDumb, GridKeys, ManualSolveGrid } from 'nonogram-grid';

import 'nonogram-grid/dist/index.css';

const App = () => {
  const mainGrid = [
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

  const thinGrid = [
    [PixelDisplay.Black],
    [PixelDisplay.White],
    [PixelDisplay.White],
    [PixelDisplay.Black],
    [PixelDisplay.Black]
  ];
  const tallGrid = [
    [
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.Black
    ]
  ];
  const absurdlyThinGrid = [
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.White],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.Black],
    [PixelDisplay.White, PixelDisplay.White],
    [PixelDisplay.Black, PixelDisplay.Black],
    [PixelDisplay.Black, PixelDisplay.Black]
  ];
  const onDragStart = (col: number, row: number) => {
    console.log(`Drag start row:${row} col:${col}`);
  };
  const onDragged = (col: number, row: number) => {
    console.log(`Dragged on row:${row} col:${col}`);
  };
  return (
    <div>
      <div className={'exampleSection'}>
        <GridKeys pixels={mainGrid}>
          <GridDumb
            pixels={mainGrid}
            editable={true}
            dragStart={onDragStart}
            onDrag={onDragged}
          ></GridDumb>
        </GridKeys>
      </div>
      <div className={'exampleSection'}>
        <GridKeys pixels={thinGrid}>
          <GridDumb
            pixels={thinGrid}
            editable={true}
            dragStart={onDragStart}
            onDrag={onDragged}
          ></GridDumb>
        </GridKeys>
      </div>
      <div className={'exampleSection'}>
        <GridKeys pixels={tallGrid}>
          <GridDumb
            pixels={tallGrid}
            editable={true}
            dragStart={onDragStart}
            onDrag={onDragged}
          ></GridDumb>
        </GridKeys>
      </div>
      <div className={'exampleSection'}>
        <ManualSolveGrid
          goalPixels={tallGrid}
          transitionModel={[
            PixelDisplay.Unknown,
            PixelDisplay.Black,
            PixelDisplay.White]}>
        </ManualSolveGrid>
      </div>
      <div className={'doubleWideExample'}>
        <GridKeys pixels={absurdlyThinGrid}>
          <GridDumb
            pixels={absurdlyThinGrid}
            editable={true}
            dragStart={onDragStart}
            onDrag={onDragged}
          ></GridDumb>
        </GridKeys>
      </div>
    </div>
  );
};

export default App;
