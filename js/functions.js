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


// Задание 4. Функция для проверки, укладывается ли встреча в рабочие часы


const isMeetingDuringWorkDay = (startWork, endWork, startMeeting, meetingDuration) => {
  const timeToMinutes = (time) => {
    const [ hours, minutes ] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  return timeToMinutes(startMeeting) >= timeToMinutes(startWork) && timeToMinutes(startMeeting) + meetingDuration <= timeToMinutes(endWork);
};

isMeetingDuringWorkDay('08:00', '17:30', '14:00', 90);
