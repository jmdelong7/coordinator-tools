function roundToDecimals(number, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
}

function cpmCalculator({budget = null, cpm = null, impressions = null}) {
  if (budget === null) {
    budget = roundToDecimals((impressions / 1000) * cpm, 2);
  } else if (cpm === null) {
    cpm = roundToDecimals((budget / impressions) * 1000, 2);
  } else if (impressions === null) {
    impressions = roundToDecimals((budget / cpm) * 1000, 2);
  }
  return {budget, cpm, impressions};
}

class CpmDisplay {
  constructor() {
    this.budget = document.getElementById('budget');
    this.cpm = document.getElementById('cpm');
    this.impressions = document.getElementById('impressions');
    this.calculate = document.getElementById('calculate');
    this.clear = document.getElementById('clear');

    [this.budget, this.cpm, this.impressions].map((input) => input.value = 0);

    this.addListeners();
  }

  calculateMissingValue() {
    const currentValues = {
      budget: Number(this.budget.value),
      cpm: Number(this.cpm.value),
      impressions: Number(this.impressions.value)
    };

    const keys = Object.keys(currentValues);
    const givenValues = Object.fromEntries(
      keys.filter((key) => currentValues[key] !== 0)
      .map((key) => [key, currentValues[key]])
    );

    return cpmCalculator(givenValues);
  }

  updateValues() {
    const newValues = this.calculateMissingValue();
    this.budget.value = newValues.budget;
    this.cpm.value = newValues.cpm;
    this.impressions.value = newValues.impressions;
  }

  addListeners() {
    this.calculate.addEventListener('click', () => {
      this.updateValues();
    });
    this.clear.addEventListener('click', () => {
      this.budget.value = 0;
      this.cpm.value = 0;
      this.impressions.value = 0;
    });
  }
}

export default function cpmController() {
  return new CpmDisplay();
}