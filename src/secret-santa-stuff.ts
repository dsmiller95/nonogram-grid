// const possibleDoubles = getCombinationsWithDoubleAtIndex0(3, 3, 2);
// console.log(possibleDoubles);

getProbCountAndEquationForSingle(6, 6, 3);
getProbCountAndEquationForDoubleMatches(6, 6, 3);

/**
 * get probability comparison for a single person getting dubs, by counting and by mathing.
 * @param n1 number if secret santa 1
 * @param n2 number in secret santa 2
 * @param x number of overlapping members
 */
function getProbCountAndEquationForDoubleMatches(
  n1: number,
  n2: number,
  x: number
): void {
  var counted = getCombinationsWithDoubleAtIndex0And1(n1, n2, x);
  var countedAsProb = counted.totalMatches / counted.totalCombos;
  var totalNum = derangements(n1) * derangements(n2);
  var n1Term = derangements(n1 - 1) / (n1 - 2);
  var n2Term = derangements(n2 - 1) / (n2 - 2);

  var estimate = (n1Term * n2Term * (x - 2)) / totalNum;

  console.log(`Counted: ${countedAsProb}`);
  console.log(`Mathed: ${estimate}`);
}

/**
 * get probability comparison for a single person getting dubs, by counting and by mathing.
 * @param n1 number if secret santa 1
 * @param n2 number in secret santa 2
 * @param x number of overlapping members
 */
function getProbCountAndEquationForSingle(
  n1: number,
  n2: number,
  x: number
): void {
  var counted = getCombinationsWithDoubleAtIndex0(n1, n2, x);
  var countedAsProb = counted.totalMatches / counted.totalCombos;
  var estimate = (x - 1) / ((n1 - 1) * (n2 - 1));

  console.log(`Counted: ${countedAsProb}`);
  console.log(`Mathed: ${estimate}`);
}

function getCombinationsWithDoubleAtIndex0And1(
  n1: number,
  n2: number,
  xTotalOptions: number
): { totalCombos: number; totalMatches: number } {
  const combos = crossCombine(getAllSecretSantaDerangements(n1), () =>
    getAllSecretSantaDerangements(n2)
  );
  var totalMatches = 0;
  var totalCombos = 0;
  for (const pair of combos) {
    //console.log(pair);
    totalCombos++;
    if (
      pair[0][0] === pair[1][0] &&
      pair[0][0] < xTotalOptions &&
      pair[0][1] === pair[1][1] &&
      pair[0][1] < xTotalOptions
    ) {
      totalMatches++;
    }
  }
  return { totalCombos, totalMatches };
}

function getCombinationsWithDoubleAtIndex0(
  n1: number,
  n2: number,
  xTotalOptions: number
): { totalCombos: number; totalMatches: number } {
  const combos = crossCombine(getAllSecretSantaDerangements(n1), () =>
    getAllSecretSantaDerangements(n2)
  );
  var totalMatches = 0;
  var totalCombos = 0;
  for (const pair of combos) {
    //console.log(pair);
    totalCombos++;
    if (pair[0][0] === pair[1][0] && pair[0][0] < xTotalOptions) {
      totalMatches++;
    }
  }
  return { totalCombos, totalMatches };
}

function derangements(n: number): number {
  return Math.round(factorial(n) / Math.E);
}
function factorial(n: number): number {
  if (n <= 1) {
    return n;
  }
  var result = 2;
  for (var nextN = 3; nextN <= n; nextN++) {
    result *= nextN;
  }
  return result;
}

function* crossCombine<T, J>(
  generator1: Generator<T>,
  generator2: () => Generator<J>
): Generator<[T, J]> {
  for (const mem1 of generator1) {
    const gen = generator2();
    for (const mem2 of gen) {
      yield [mem1, mem2];
    }
  }
}

// return a list of all possible derangements of a set N size
function getAllSecretSantaDerangements(setSize: number): Generator<number[]> {
  return appendSantaSolutions([], setSize);
}

function* appendSantaSolutions(
  previousList: number[],
  setSize: number
): Generator<number[]> {
  if (previousList.length === setSize) {
    yield previousList;
  }
  var currentIndex = previousList.length;
  for (let pick = 0; pick < setSize; pick++) {
    if (currentIndex === pick || previousList.includes(pick)) {
      continue;
    }

    yield* appendSantaSolutions([...previousList, pick], setSize);
  }
}
