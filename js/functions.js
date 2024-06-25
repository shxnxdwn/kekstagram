// Задание 1. Функция для проверки длины строки

const isValidStringLength = (string, maxLength) => string.length <= maxLength;

isValidStringLength('cat', 3); // expected true is equal true
isValidStringLength('apple', 7); // expected true is equal true
isValidStringLength('watermelon', 9); // expected false is equal false


// Задание 2. Функция для проверки, является ли строка палиндромом

// Первый вариант

const isPalindrome = (string) => {
  const convectedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = convectedString.split('').reverse().join('');
  return reversedString === convectedString;
};

isPalindrome('Анна'); // expected true is equal true
isPalindrome('топот'); // expected true is equal true
isPalindrome('ДовОд'); // expected true is equal true
isPalindrome('Лёша на полке клопа нашёл '); // expected true is equal true
isPalindrome('Кекс'); // expected false is equal false


// Второй вариант

const isPalindromeCycle = (string) => {
  const convectedString = string.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < convectedString.length; i++) {
    if (convectedString[i] !== convectedString[convectedString.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

isPalindromeCycle('Анна'); // expected true is equal true
isPalindromeCycle('топот'); // expected true is equal true
isPalindromeCycle('ДовОд'); // expected true is equal true
isPalindromeCycle('Лёша на полке клопа нашёл '); // expected true is equal true
isPalindromeCycle('Кекс'); // expected false is equal false


// Дополнительное задание

const parseNumbers = (data) => {
  if (typeof data === 'string') {
    const numbers = data.match(/\d/g);
    return numbers ? +numbers.join('') : NaN;
  }

  if (typeof data === 'number') {
    return data === 0 ? 'Функция возвращает только целые положительные числа' : +String(data).replace(/\D+/g, '');
  }
};

parseNumbers('2023 год'); // expected 2023 is equal 2023
parseNumbers('ECMAScript 2022'); // expected 2022 is equal 2022
parseNumbers('1 кефир, 0.5 батона'); // expected 105 is equal 105
parseNumbers('агент 007'); // expected 7 is equal 7
parseNumbers('а я томат'); // expected NaN is equal NaN :)
parseNumbers(2023); // expected 2023 is equal 2023
parseNumbers(-1); // expected 1 is equal 1
parseNumbers(1.5); // expected 15 is equal 15
parseNumbers(0); // В задании не указано что делать в этом случае, только, что функция возвращает n > 0
