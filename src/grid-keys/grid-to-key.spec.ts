import { generateKey } from './grid-to-key';
import { PixelDisplay } from '../models/PixelDisplay';
import { gridFromString } from '../grid-creation-utilities';

describe('when generating guides based off of a grid', () => {
  it('should generate guides from a given grid', () => {
    const grid = gridFromString(`
            XOXXXOXX
            XOOOXOOX
            XXXXXOOX
            OOXOOXOX
            XXXXXXXX
            OOOOOOOO
        `).map((row) => row.map((cell) => cell === PixelDisplay.Black));
    const guide = generateKey(grid);
    expect(guide.secondDimension).toEqual([
      [3, 1],
      [1, 1],
      [1, 3],
      [1, 1, 1],
      [3, 1],
      [2],
      [1, 1],
      [5],
    ]);
    expect(guide.firstDimension).toEqual([
      [1, 3, 2],
      [1, 1, 1],
      [5, 1],
      [1, 1, 1],
      [8],
      [],
    ]);
  });
});
