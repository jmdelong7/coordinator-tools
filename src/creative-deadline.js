import {
  subDays,
  parseISO,
  startOfDay,
  format
} from 'date-fns';

export function standardizeDate(date) {
  const standardDate = startOfDay(parseISO(date));
  return standardDate;
}

const daysToSubtract = {
  traditional: 14,
  large: 28,
  banner: 45
};

export function updateDates(ele) {
  const standardDate = standardizeDate(ele.value);
  const deadlines = {};

  Object.entries(daysToSubtract).forEach(([type, days]) => {
    const deadline = subDays(standardDate, days);
    deadlines[type] = {
      short: format(deadline, 'P'),
      long: format(deadline, 'PPPP')
    };
  });

  return deadlines;
}