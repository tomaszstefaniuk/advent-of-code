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

const numbers = {
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
};

const getNumbers2 = (arr: string[]) => {
  let sum = 0;
  arr.forEach((element) => {
    // Get indexes of numbers
    const indexes = Object.keys(numbers).map((num) => element.indexOf(num));
    const foundIndexes = indexes.filter((index) => index !== -1);

    const lowestIndex = Math.min(...foundIndexes);
    const highestIndex = Math.max(...foundIndexes);

    const firstNumber = Object.keys(numbers)[
      indexes.indexOf(lowestIndex)
    ] as keyof typeof numbers;

    const secondNumber = Object.keys(numbers)[
      indexes.indexOf(highestIndex)
    ] as keyof typeof numbers;

    const parsedFirstNumber = numbers[firstNumber];
    const parsedSecondNumber = numbers[secondNumber];

    const number = parseInt(parsedFirstNumber + parsedSecondNumber);
    console.log(firstNumber, secondNumber);
    console.log("number: ", number);
    sum += number;
  });
  return sum;
};

// console.log(getNumbers(input));
console.log(getNumbers2(["twone"]));
