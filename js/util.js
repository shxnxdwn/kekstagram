const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

export { getRandomInteger, getRandomArrayElement, createUniqueNumbersGenerator };
