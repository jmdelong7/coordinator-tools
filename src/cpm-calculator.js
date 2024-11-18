function cpmCalculator({budget = null, cpm = null, impressions = null}) {
  if (budget === null) {
    budget = (impressions / 1000) * cpm;
  } else if (cpm === null) {
    cpm = (budget / impressions) * 1000;
  } else if (impressions === null) {
    impressions = (budget / cpm) * 1000;
  }
  return {budget, cpm, impressions};
}

class CpmDisplay {
  constructor() {
    this.budget = null;
    this.cpm = null;
    this.impressions = null;
  }

  calculate({budget = null, cpm = null, impressions = null}) {
    
  }
}

export default function cpmController() {
  return new CpmDisplay();
}