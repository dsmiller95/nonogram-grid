import React from 'react';

import { PixelDisplay, GridDumb, GridKeys, ManualSolveGrid, gridFromString } from 'nonogram-grid';

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

  const tallGrid = [
    [PixelDisplay.Black],
    [PixelDisplay.White],
    [PixelDisplay.White],
    [PixelDisplay.Black],
    [PixelDisplay.Black]
  ];
  const thinGrid = [
    [
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.White,
      PixelDisplay.Black,
      PixelDisplay.Black
    ]
  ];
  const absurdlyTallGrid = [
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
  const onDragStart = (row: number, col: number) => {
    console.log(`Drag start row:${row} col:${col}`);
  };
  const onDragged = (row: number, col: number) => {
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
        <GridKeys
          pixels={thinGrid}
          hideRowKeys={true}>
          <GridDumb
            pixels={thinGrid}
            editable={true}
            dragStart={onDragStart}
            onDrag={onDragged}
          ></GridDumb>
        </GridKeys>
      </div>
      <div className={'exampleManualSize'}>
        <ManualSolveGrid
          goalPixels={thinGrid}
          transitionModel={[
            PixelDisplay.Unknown,
            PixelDisplay.Black,
            PixelDisplay.White]}
          cellSize={40}
          >
        </ManualSolveGrid>
      </div>
      <div className={'exampleManualSize'}>
        <GridKeys pixels={absurdlyTallGrid} cellSize={15}>
          <GridDumb
            pixels={absurdlyTallGrid}
            editable={true}
            dragStart={onDragStart}
            onDrag={onDragged}
          ></GridDumb>
        </GridKeys>
      </div>
      <div className={'exampleManualSize'}>
        <ManualSolveGrid
          goalPixels={gridFromString(`
          XOOXX
          `)}
          verificationPixels={gridFromString(`
          ---X-`)}
          transitionModel={[
            PixelDisplay.Unknown,
            PixelDisplay.Black,
            PixelDisplay.White]}
          cellSize={25}
          hideColKeys={true}>
        </ManualSolveGrid>
      </div>
    </div>
  );
};

export default App;
