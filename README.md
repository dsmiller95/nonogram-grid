# nonogram-grid

> A grid to display or edit nonograms inside of

[![NPM](https://img.shields.io/npm/v/nonogram-grid.svg)](https://www.npmjs.com/package/nonogram-grid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save nonogram-grid
```

## Usage

```tsx
import React, { Component } from 'react';

import { PixelDisplay, GridDumb } from 'nonogram-grid';
import 'nonogram-grid/dist/index.css';

class Example extends Component {
  render() {
    const gridData = [
      [PixelDisplay.White, PixelDisplay.Black, PixelDisplay.White],
      [PixelDisplay.White, PixelDisplay.White, PixelDisplay.Black],
      [PixelDisplay.Black, PixelDisplay.White, PixelDisplay.Black]
    ];
    return <GridDumb pixels={gridData} editable={false} />;
  }
}
```

## License

MIT © [dsmiller95](https://github.com/dsmiller95)
