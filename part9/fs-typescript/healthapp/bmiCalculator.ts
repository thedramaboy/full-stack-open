interface Info {
    height: number,
    weight: number
}

type Category = 'Underweight (Severe thinness)' | 'Underweight (Moderate thinness)' | 'Underweight (Mild thinness)' | 'Normal range' | 'Overweight (Pre-obese)' | 'Obese (Class I)' | 'Obese (Class II)' | 'Obese (Class III)' 

const parseArguments = (args: string[]): Info => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight) && height > 0) {
    return { height, weight };
  } else {
    throw new Error('Provided values were not numbers or height is zero!');
  }
};

const calculateBmi = (height: number, weight: number): Category => {
    const result = weight / ((height / 100) * (height / 100));
    if (result < 16) return 'Underweight (Severe thinness)';
    else if (result < 17) return 'Underweight (Moderate thinness)';
    else if (result < 18.5) return 'Underweight (Mild thinness)';
    else if (result < 25) return 'Normal range';
    else if (result < 30) return 'Overweight (Pre-obese)';
    else if (result < 35) return 'Obese (Class I)';
    else if (result < 40) return 'Obese (Class II)';
    else return 'Obese (Class III)';
}

console.log(calculateBmi(180, 74))