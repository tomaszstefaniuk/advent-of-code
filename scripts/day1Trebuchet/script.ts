import { input } from "../../inputs/day1/input";

const getNumbers = (arr: string[]) => {
  let sum = 0;
  arr.forEach((element) => {
    const numbersArray = element.match(/\d/g);

    if (!numbersArray) {
      return;
    }
    const firstNumber = numbersArray[0];
    const secondNumber = numbersArray[numbersArray.length - 1];

    const number = parseInt(firstNumber + secondNumber);

    sum += number;
  });
  return sum;
};

const symbols = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

const getNumbers2 = (arr: string[]) => {
  let sum = 0;
  arr.forEach((str) => {
    let foundIndexes: { [key: string]: string } = {};

    Object.keys(symbols).map((symbolKey) => {
      str.indexOf(symbolKey);
      let currentIndex = str.indexOf(symbolKey);
      while (currentIndex !== -1) {
        foundIndexes = {
          ...foundIndexes,
          ...{
            [currentIndex]: symbols[symbolKey as keyof typeof symbols],
          },
        };
        currentIndex = str.indexOf(symbolKey, currentIndex + 1);
      }
    });

    const lowestIndex = Math.min(
      ...[...Object.keys(foundIndexes)].map((v) => Number(v))
    );
    const highestIndex = Math.max(
      ...[...Object.keys(foundIndexes)].map((v) => Number(v))
    );

    const firstNumber = foundIndexes[lowestIndex];
    const secondNumber = foundIndexes[highestIndex];

    const parsedFirstNumber = symbols[firstNumber as keyof typeof symbols];
    const parsedSecondNumber = symbols[secondNumber as keyof typeof symbols];

    const number = parseInt(parsedFirstNumber + parsedSecondNumber);
    sum += number;
  });
  return sum;
};

// console.log(getNumbers(input));
console.log(getNumbers2(input));
