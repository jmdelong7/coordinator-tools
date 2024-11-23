function cpmCalculator({budget = null, cpm = null, impressions = null}) {
  if (budget === null) {
  } else if (cpm === null) {
    cpm = (budget / impressions) * 1000;
  } else if (impressions === null) {
    impressions = (budget / cpm) * 1000;
  }
  return {budget, cpm, impressions};
}

class CpmDisplay {
  constructor() {
    this.budget = document.getElementById('budget');
    this.cpm = document.getElementById('cpm');
    this.impressions = document.getElementById('impressions');

  }

  calculate({budget = null, cpm = null, impressions = null}) {
    cpmCalculator(budget, cpm, impressions);
    this.budget.value = budget;
  }
}

export default function cpmController() {
  return cpmCalculator;
}