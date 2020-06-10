import { PixelDisplay } from './models/PixelDisplay';

/**
 * X : set
 * O : unset
 *   : unknown
 * @param rowString a string to transform into a row of nonogram cells
 */
const charMap: Record<string, PixelDisplay> = {
  X: PixelDisplay.Black,
  O: PixelDisplay.White,
  '-': PixelDisplay.Unknown,
};
function rowFromString(rowString: string): PixelDisplay[] {
  return Array.from(rowString)
    .filter((char) => ['X', 'O', '-'].includes(char))
    .map((char) => charMap[char]);
}
/**
 * Use this function to create a grid from a large string: every line is a new row
 * and each character is a cell. `X` for Black, `O` for White, and `-` for Unknown
 *  Whitespace other than a newline is ignored
 * @param gridString A template string to create the grid from
 */
export function gridFromString(gridString: string): PixelDisplay[][] {
  return gridString
    .split('\n')
    .map((string) => rowFromString(string))
    .filter((cells) => cells.length > 0);
}
