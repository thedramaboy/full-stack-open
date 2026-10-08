interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Data {
    hoursArr: number[],
    target: number
}

const args = (args: string[]): Data => {

    if (args.length < 4) throw new Error("Not enough arguments")
    if (args.length > 4) throw new Error("Too many arguments")
    
    const hoursArr = Number(args[2]);
    const target = Number(args[3]);

    return { hoursArr, target};
}

// const calculateExercises = (hoursArr: number[]): Result => {
//     if (hours.length == 0) throw new Error("Nothing is in the array.")
// }