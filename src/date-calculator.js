import { addDays } from 'date-fns';

export default class DateCalculator {
  constructor(startDate, weeks) {
    this.startDate = startDate;
    this.days = (weeks * 7) - 1;
    this.weeks = weeks;
    this.periods = weeks / 4;
    this.endDate = addDays(this.startDate, this.days);
  }

  omitProperty(property) {
    const properties = Object.getOwnPropertyNames(this);
    const filtered = properties.filter((prop) => {
      return prop !== property;
    });
    return filtered;
  }

}