import { PixelDisplay } from '../base-grid/GridDumb';
import { generateKey } from './grid-to-key';

/**
 * X : set
 * O : unset
 *   : unknown
 * @param rowString a string to transform into a row of nonogram cells
 */
const charMap: Record<string, PixelDisplay> = {
  X: PixelDisplay.Black,
  O: PixelDisplay.White,
  '-': PixelDisplay.Unknown
};
function rowFromString(rowString: string): PixelDisplay[] {
  return Array.from(rowString)
    .filter((char) => ['X', 'O', '-'].includes(char))
    .map((char) => charMap[char]);
}
function gridFromString(gridString: string): PixelDisplay[][] {
  return gridString
    .split('\n')
    .map((string) => rowFromString(string))
    .filter((cells) => cells.length > 0);
}

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
    let guide = generateKey(grid);
    expect(guide.secondDimension).toEqual([
      [3, 1],
      [1, 1],
      [1, 3],
      [1, 1, 1],
      [3, 1],
      [2],
      [1, 1],
      [5]
    ]);
    expect(guide.firstDimension).toEqual([
      [1, 3, 2],
      [1, 1, 1],
      [5, 1],
      [1, 1, 1],
      [8],
      []
    ]);
  });
});
