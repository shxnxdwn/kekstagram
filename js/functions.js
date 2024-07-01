// Задание 1. Функция для проверки длины строки

const isValidStringLength = (string, maxLength) => string.length <= maxLength;

// Задание 2. Функция для проверки, является ли строка палиндромом

// Первый вариант

const isPalindrome = (string) => {
  const convectedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = convectedString.split('').reverse().join('');
  return reversedString === convectedString;
};

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


isValidStringLength('cat', 3);
isPalindrome('Анна');
isPalindromeCycle('Анна');
parseNumbers('2023 год');
