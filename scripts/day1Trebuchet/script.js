"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../../inputs/day1/input");
const getNumbers = (arr) => {
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
};
const getNumbers2 = (arr) => {
    let sum = 0;
    arr.forEach((str) => {
        let foundIndexes = {};
        Object.keys(symbols).map((symbolKey) => {
            str.indexOf(symbolKey);
            let currentIndex = str.indexOf(symbolKey);
            while (currentIndex !== -1) {
                foundIndexes = Object.assign(Object.assign({}, foundIndexes), {
                    [currentIndex]: symbols[symbolKey],
                });
                currentIndex = str.indexOf(symbolKey, currentIndex + 1);
            }
        });
        const lowestIndex = Math.min(...[...Object.keys(foundIndexes)].map((v) => Number(v)));
        const highestIndex = Math.max(...[...Object.keys(foundIndexes)].map((v) => Number(v)));
        const firstNumber = foundIndexes[lowestIndex];
        const secondNumber = foundIndexes[highestIndex];
        const parsedFirstNumber = symbols[firstNumber];
        const parsedSecondNumber = symbols[secondNumber];
        const number = parseInt(parsedFirstNumber + parsedSecondNumber);
        sum += number;
    });
    return sum;
};
// console.log(getNumbers(input));
console.log(getNumbers2(input_1.input));
