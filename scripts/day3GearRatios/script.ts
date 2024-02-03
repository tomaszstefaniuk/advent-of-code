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

getSumOfFoundNumbers(input);
