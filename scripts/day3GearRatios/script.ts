import { input } from "../../inputs/day3/input";

const checkIfCharacterIsSymbol = (line: string, index: number) => {
  if (line[index] !== "." && line[index] !== undefined) {
    return true;
  }
  return false;
};

const checkIfCharacterInPreviousOrNextLineIsSymbol = (
  line: string,
  startIndex: number,
  endIndex: number
) => {
  if (line === undefined) {
    return false;
  }
  for (let i = startIndex; i <= endIndex; i++) {
    if (checkIfCharacterIsSymbol(line, i)) {
      return true;
    }
  }
  return false;
};

const getSumOfFoundNumbers = (input: string[]) => {
  let foundNumbersFromAllLinesSum = 0;

  for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
    let foundNumber = "";
    let foundNumbersSum = 0;
    let isNumberFound = false;
    const line = `${input[inputIndex]}.`;

    for (let lineIndex = 0; lineIndex < line.length; lineIndex++) {
      if (!isNaN(Number(line[lineIndex]))) {
        foundNumber += line[lineIndex];
        isNumberFound = true;
      } else {
        if (isNumberFound) {
          const isFoundNumberAdjacentToSymbolInCurrentLine =
            checkIfCharacterIsSymbol(line, lineIndex) ||
            checkIfCharacterIsSymbol(line, lineIndex - 1 - foundNumber.length);

          const isFoundNumberAdjacentToSymbolWithPreviousLine =
            checkIfCharacterInPreviousOrNextLineIsSymbol(
              input[inputIndex - 1],
              lineIndex - 1 - foundNumber.length,
              lineIndex
            );

          const isFoundNumberAdjacentToSymbolWithNextLine =
            checkIfCharacterInPreviousOrNextLineIsSymbol(
              input[inputIndex + 1],
              lineIndex - 1 - foundNumber.length,
              lineIndex
            );

          if (
            isFoundNumberAdjacentToSymbolInCurrentLine ||
            isFoundNumberAdjacentToSymbolWithPreviousLine ||
            isFoundNumberAdjacentToSymbolWithNextLine
          ) {
            foundNumbersSum += Number(foundNumber);
          }
          foundNumber = "";
          isNumberFound = false;
        }
      }
    }
    foundNumbersFromAllLinesSum += foundNumbersSum;
  }

  console.log("foundNumbersFromAllLinesSum: ", foundNumbersFromAllLinesSum);
};

// getSumOfFoundNumbers(input);

/*** PART 2 ***/

const getNumberWithStartIndexAdjacentToAsterisk = (
  numberIndex: number,
  line: string
) => {
  let numberStartIndex = 0;

  for (let i = numberIndex; i >= 0; i--) {
    if (isNaN(Number(line[i]))) {
      numberStartIndex = i + 1;
      break;
    }
  }

  for (let i = numberIndex; i < line.length; i++) {
    if (isNaN(Number(line[i]))) {
      return [
        numberStartIndex,
        Number(line.slice(Number(numberStartIndex), i)),
      ];
    }
  }
};

const getProductOfNumbersAdjacentToAsterisk = (
  currentLine: string,
  prevLine: string,
  nextLine: string,
  asteriskIndex: number
) => {
  const numbersForCurrentLine: number[] = [];
  const numbersForPrevLine: number[] = [];
  const numbersForNextLine: number[] = [];

  const numbersIndexesForPrevLine: number[] = [];
  const numbersIndexesForNextLine: number[] = [];

  if (!isNaN(Number(currentLine[asteriskIndex - 1]))) {
    const newIndexes = getNumberWithStartIndexAdjacentToAsterisk(
      asteriskIndex - 1,
      currentLine
    );
    if (
      newIndexes &&
      typeof newIndexes[0] === "number" &&
      typeof newIndexes[1] === "number"
    ) {
      numbersForCurrentLine.push(newIndexes[1]);
    }
  }
  if (!isNaN(Number(currentLine[asteriskIndex + 1]))) {
    const newIndexes = getNumberWithStartIndexAdjacentToAsterisk(
      asteriskIndex + 1,
      currentLine
    );
    if (
      newIndexes &&
      typeof newIndexes[0] === "number" &&
      typeof newIndexes[1] === "number"
    ) {
      numbersForCurrentLine.push(newIndexes[1]);
    }
  }

  for (let i = asteriskIndex - 1; i <= asteriskIndex + 1; i++) {
    if (!isNaN(Number(prevLine[i]))) {
      const newIndexes = getNumberWithStartIndexAdjacentToAsterisk(i, prevLine);
      if (
        newIndexes &&
        typeof newIndexes[0] === "number" &&
        typeof newIndexes[1] === "number" &&
        !numbersIndexesForPrevLine.includes(newIndexes[0])
      ) {
        numbersIndexesForPrevLine.push(newIndexes[0]);
        numbersForPrevLine.push(newIndexes[1]);
      }
    }

    if (nextLine && !isNaN(Number(nextLine[i]))) {
      const newIndexes = getNumberWithStartIndexAdjacentToAsterisk(i, nextLine);
      if (
        newIndexes &&
        typeof newIndexes[0] === "number" &&
        typeof newIndexes[1] === "number" &&
        !numbersIndexesForNextLine.includes(newIndexes[0])
      ) {
        numbersIndexesForNextLine.push(newIndexes[0]);
        numbersForNextLine.push(newIndexes[1]);
      }
    }
  }

  const foundNumbers = [
    ...numbersForPrevLine,
    ...numbersForCurrentLine,
    ...numbersForNextLine,
  ];

  if (foundNumbers.length >= 2) {
    let result = 1;
    for (let i = 0; i < foundNumbers.length; i++) {
      result *= foundNumbers[i];
    }
    return result;
  } else {
    return 0;
  }
};

const getSumOfMultipliedNumbersAdjacentToAsterisk = (input: string[]) => {
  let foundNumbersFromAllLinesSum = 0;

  for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
    const line = `${input[inputIndex]}.`;
    const prevLine = `${input[inputIndex - 1]}.`;
    const nextLine = `${input[inputIndex + 1]}.`;

    for (let lineIndex = 0; lineIndex < line.length; lineIndex++) {
      if (line[lineIndex] === "*") {
        foundNumbersFromAllLinesSum += getProductOfNumbersAdjacentToAsterisk(
          line,
          prevLine,
          nextLine,
          lineIndex
        );
      }
    }
  }

  console.log("foundNumbersFromAllLinesSum: ", foundNumbersFromAllLinesSum);
};

getSumOfMultipliedNumbersAdjacentToAsterisk(input);
