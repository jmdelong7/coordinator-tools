import { roundToDecimals } from "./cpm-calculator";

export function taxCalculator(addOrRemove, taxRate, value) {
  if (addOrRemove === 'add') {
    const newValue = roundToDecimals(value * (1 + taxRate), 2);
    return newValue;
  } else if (addOrRemove === 'remove') {
    const newValue = roundToDecimals(value / (1 + taxRate), 2);
    return newValue;
  }
}

const marketTaxRates = {
  'Amtrak DC': '6.000',
  'Atlanta': '8.900',
  'Austin': '8.250',
  'Boston': '6.250',
  'Chicago': '10.500',
  'Las Vegas': '8.375',
  'Los Angeles': '10.250',
  'Minneapolis': '7.375',
  'New Jersey': '6.625',
  'New York': '8.875',
  'Philadelphia': '8.000',
  'Pittsburgh': '7.000',
  'Portland': '0.000',
  'San Francisco': '8.630',
  'Seattle KCM': '10.350',
  'Seattle Sound': '10.350'
};

export class TaxDisplay {
  constructor() {
    this.taxRates = marketTaxRates;
    this.input = document.getElementById('cost');
    this.taxTable = document.getElementById('tax-table');
    
    this.displayTaxTable();
  }

  createTaxTableRow(market, taxRate) {
    return `
      <div class="tax-table-row" role="button">
        <p class="tax-table-market">${market}</p>
        <p class="tax-table-rate">${taxRate} <span class="tax-percent">%</span></p>
      </div>
    `;
  }

  displayTaxTable() {
    Object.entries(marketTaxRates).forEach(([market, rate]) => {
      this.taxTable.innerHTML = this.taxTable.innerHTML + this.createTaxTableRow(market, rate);
    });
  }
}