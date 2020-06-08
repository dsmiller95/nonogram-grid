export function generateKey(grid: boolean[][]) {
  const firstDimension: number[][] = [];
  for (
    let firstDimensionIndex = 0;
    firstDimensionIndex < grid.length;
    firstDimensionIndex++
  ) {
    firstDimension.push(generateKeyForSlice(grid[firstDimensionIndex]));
  }

  const secondDimension: number[][] = [];
  for (
    let secondDimensionIndex = 0;
    secondDimensionIndex < grid[0].length;
    secondDimensionIndex++
  ) {
    secondDimension.push(
      generateKeyForSlice(grid.map((column) => column[secondDimensionIndex]))
    );
  }

  return {
    firstDimension,
    secondDimension
  };
}

function generateKeyForSlice(slice: boolean[]): number[] {
  const key: number[] = [];
  let runLength = 0;
  for (let i = 0; i < slice.length; i++) {
    let pixel = slice[i];
    if (pixel) {
      runLength++;
    }
    if (runLength > 0 && !pixel) {
      key.push(runLength);
      runLength = 0;
    }
  }
  if (runLength > 0) {
    key.push(runLength);
  }
  return key;
}
