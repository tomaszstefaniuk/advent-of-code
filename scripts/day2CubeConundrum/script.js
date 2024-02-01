"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../../inputs/day2/input");
const sumOfIdsOfPossibleGames = (arr) => {
    const redMax = 12;
    const greenMax = 13;
    const blueMax = 14;
    let sumOfIndexes = 0;
    const isGameNotPossible = (splitedRolls) => {
        for (let roll of splitedRolls) {
            const splitedRoll = roll.split(",");
            let redAmount = "0";
            let greenAmount = "0";
            let blueAmount = "0";
            for (let color of splitedRoll) {
                if (color.includes("red")) {
                    redAmount = color.split("red")[0];
                }
                if (color.includes("green")) {
                    greenAmount = color.split("green")[0];
                }
                if (color.includes("blue")) {
                    blueAmount = color.split("blue")[0];
                }
            }
            if (parseInt(redAmount) > redMax ||
                parseInt(greenAmount) > greenMax ||
                parseInt(blueAmount) > blueMax) {
                return true;
            }
        }
    };
    for (let i = 1; i <= arr.length - 1; i++) {
        const rollsAsStr = arr[i].replace(`${i}: `, "");
        const splitedRolls = rollsAsStr.split(";");
        sumOfIndexes += isGameNotPossible(splitedRolls) ? 0 : i;
    }
    return sumOfIndexes;
};
const getSumOfMultipliedMinimumSetsOfCubes = (arr) => {
    let sumOfMultipliedMinimumSetsOfCubes = 0;
    const getProductOfMinimumSetsOfCubesOfGame = (splitedDiceRolls) => {
        let redMinimumForPossibleGame = 0;
        let greenMinimumForPossibleGame = 0;
        let blueMinimumForPossibleGame = 0;
        for (let diceRoll of splitedDiceRolls) {
            const splitedDiceRoll = diceRoll.split(",");
            for (let diceColor of splitedDiceRoll) {
                if (diceColor.includes("red")) {
                    const redAmount = parseInt(diceColor.split("red")[0]);
                    if (redAmount > redMinimumForPossibleGame) {
                        redMinimumForPossibleGame = redAmount;
                    }
                }
                if (diceColor.includes("green")) {
                    const greenAmount = parseInt(diceColor.split("green")[0]);
                    if (greenAmount > greenMinimumForPossibleGame) {
                        greenMinimumForPossibleGame = greenAmount;
                    }
                }
                if (diceColor.includes("blue")) {
                    const blueAmount = parseInt(diceColor.split("blue")[0]);
                    if (blueAmount > blueMinimumForPossibleGame) {
                        blueMinimumForPossibleGame = blueAmount;
                    }
                }
            }
        }
        return (redMinimumForPossibleGame *
            greenMinimumForPossibleGame *
            blueMinimumForPossibleGame);
    };
    for (let i = 1; i <= arr.length - 1; i++) {
        const diceRollsAsStr = arr[i].replace(`${i}: `, "");
        const splitedDiceRolls = diceRollsAsStr.split(";");
        sumOfMultipliedMinimumSetsOfCubes +=
            getProductOfMinimumSetsOfCubesOfGame(splitedDiceRolls);
    }
    return sumOfMultipliedMinimumSetsOfCubes;
};
// console.log("sumIdsOfPossibleGames: ", sumOfIdsOfPossibleGames(input));
console.log("sumOfMultipliedMinimumSetsOfCubes: ", getSumOfMultipliedMinimumSetsOfCubes(input_1.input));
