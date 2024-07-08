import { getRandomInteger } from './get-random-integer.js';

const createUniqueNumbersGenerator = (min, max) => {
  const generatedNumbers = new Set();

  return () => {
    if (generatedNumbers.size >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    let currentValue;
    do {
      currentValue = getRandomInteger(min, max);
    } while (generatedNumbers.has(currentValue));

    generatedNumbers.add(currentValue);
    return currentValue;
  };
};

export { createUniqueNumbersGenerator };
