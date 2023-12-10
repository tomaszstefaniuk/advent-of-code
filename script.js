import { inputText } from "./input.js";

const getNumbers = (arr) => {
  let sum = 0;
  arr.forEach((element) => {
    const numbersArray = element.match(/\d/g);

    const firstNumber = numbersArray[0];
    const secondNumber = numbersArray[numbersArray.length - 1];

    const number = parseInt(firstNumber + secondNumber);

    sum += number;

    return sum;
  });
};

getNumbers(inputText);
