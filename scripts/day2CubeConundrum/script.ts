import { input } from "../../inputs/day2/input";

const sumOfIdsOfPossibleGames = (arr: string[]) => {
  const redMax = 12;
  const greenMax = 13;
  const blueMax = 14;
  let sumOfIndexes = 0;

  const isGameNotPossible = (splitedRolls: string[]) => {
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
      if (
        parseInt(redAmount) > redMax ||
        parseInt(greenAmount) > greenMax ||
        parseInt(blueAmount) > blueMax
      ) {
        return true;
      }
    }
  };

  for (let i = 1; i <= arr.length - 1; i++) {
    const rollsWithGameIndexAsStr = arr[i].replace(`${i}: `, "");
    const splitedRolls = rollsWithGameIndexAsStr.split(";");

    sumOfIndexes += isGameNotPossible(splitedRolls) ? 0 : i;
  }
  return sumOfIndexes;
};

console.log("sumIdsOfPossibleGames: ", sumOfIdsOfPossibleGames(input));
