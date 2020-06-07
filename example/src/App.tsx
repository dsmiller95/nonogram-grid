import React from 'react'

import { ExampleComponent, PixelDisplay, GridDumb } from 'nonogram-grid'
import 'nonogram-grid/dist/index.css'

const App = () => {
  const fullGrid = new Array(10)
    .fill(undefined)
    .map(() =>
      new Array(10)
        .fill(undefined)
        .map(() =>
          Math.random() > 0.5 ? PixelDisplay.Black : PixelDisplay.White
        )
    )
  return (
    <div>
      <ExampleComponent text='Create React Library Example 😄' />
      <div className='grid-container'>
        <GridDumb pixels={fullGrid} editable={false}></GridDumb>
      </div>
    </div>
  )
}

export default App
