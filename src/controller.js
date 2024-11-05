import DateCalculator from "./date-calculator";

export default class Controller {
  constructor(date, startDateId, endDateId, daysId, weeksId, periodsId) {
    this.dateCalculator = new DateCalculator(date);
    this.startDateInput = {
      el: document.getElementById(startDateId), 
      name: 'startDate',
      val: this.dateCalculator.startDate
    };
    this.endDateInput = {
      el: document.getElementById(endDateId), 
      name: 'endDate',
      val: this.dateCalculator.endDate
    };
    this.daysInput = {
      el: document.getElementById(daysId), 
      name: 'days',
      val: this.dateCalculator.days
    };
    this.weeksInput = {
      el: document.getElementById(weeksId), 
      name: 'weeks',
      val: this.dateCalculator.weeks
    };
    this.periodsInput = {
      el: document.getElementById(periodsId), 
      name: 'periods',
      val: this.dateCalculator.periods
    };

    this.startDateInput.el.valueAsDate = this.startDateInput.val;
    this.endDateInput.el.valueAsDate = this.endDateInput.val;
    this.daysInput.el.value = this.daysInput.val;
    this.weeksInput.el.value = this.weeksInput.val;
    this.periodsInput.el.value = this.periodsInput.val;
    
  }

  detectInputChange(input) {
    input.el.addEventListener('input', (e) => {
      input.val = e.value;
      this.dateCalculator.updateValues({[input.name]: input.val});
    });
  }
  
  updateCalculatorValues(dateInput) {
    this.dateCalculator.updateValues({[dateInput.name]: dateInput.val});
  }

  updateDom(dateValue) {
    this.dateCalculator.updateValues(dateValue);
    this.updateDisplay();
  }


}