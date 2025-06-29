import { roundToDecimals, addStrCommas } from "./cpm-calculator";

const marketTaxRates = {
  'Amtrak DC': '6.000',
  'Atlanta': '8.900',
  'Austin': '8.250',
  'Boston': '6.250',
  'Chicago': '10.500',
  'Las Vegas': '8.375',
  'Los Angeles': '10.500',
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

export function taxCalculator(taxRate, cost) {
  const rounded = roundToDecimals(taxRate / 100, 5);
  const taxAmt = roundToDecimals(cost * rounded, 2);
  const taxAdded = roundToDecimals(cost * (1 + rounded), 2);
  const taxSubtracted = roundToDecimals(cost / (1 + rounded), 2);

  return { taxAdded, taxSubtracted, taxAmt};
}

export class TaxDisplay {
  constructor() {
    this.cost = document.getElementById('tax-cost');
    this.taxTable = document.getElementById('tax-table');
    this.selectedMarket = 'Chicago';
    this.prevSelectedMarket = 'Chicago';
    
    this.displayTaxTable();
    this.addTaxTableListeners();
    this.addCostTaxListeners();
    
    document.getElementById('chicago').classList.add('selectedTaxMarket');
    this.calculateTax();
    this.copyListeners();
  }

  get selectedMarketTaxRate() {
    return Number(marketTaxRates[this.selectedMarket]);
  }

  createTaxTableRow(market, taxRate) {
    const dashCase = market.split(' ').join('-').toLowerCase();
    return `
      <div class="tax-table-row" role="button" id=${dashCase}>
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

  markSelectedRow(market) {
    this.prevSelectedMarket = this.selectedMarket;
    const prevDashCaseMarket = this.prevSelectedMarket.split(' ').join('-').toLowerCase();
    const prevRow = document.getElementById(prevDashCaseMarket);
    prevRow.classList.remove('selectedTaxMarket');
    this.selectedMarket = market;
  }
  
  addTaxTableListeners() {
    const taxTableRows = [...this.taxTable.children];
    taxTableRows.forEach((row) => {
      row.addEventListener('click', () => {
        const market = row.firstElementChild.textContent;
        this.markSelectedRow(market);
        row.classList.add('selectedTaxMarket');
        this.calculateTax();
      });
    });
  }

  calculateTax() {
    let costWithTax = document.getElementById('with-tax-digits');
    let costWithoutTax = document.getElementById('without-tax-digits');
    let taxAmt = document.getElementById('tax-amt-digits');
    const calculated = taxCalculator(this.selectedMarketTaxRate, Number(this.cost.value));
    costWithTax.textContent = addStrCommas(String(calculated.taxAdded));
    costWithoutTax.textContent = addStrCommas(String(calculated.taxSubtracted));
    taxAmt.textContent = addStrCommas(String(calculated.taxAmt));
  }

  addCostTaxListeners() {
    this.cost.addEventListener('input', () => this.calculateTax());
  }

  copyListeners() {
    const taxBtn = document.getElementById('tax-copy');
    const costWithTaxBtn = document.getElementById('cost-with-tax-copy');
    const costWithoutTaxBtn = document.getElementById('cost-without-tax-copy');

    const taxAmt = document.getElementById('tax-amt-digits');
    const costWithTax = document.getElementById('with-tax-digits');
    const costWithoutTax = document.getElementById('without-tax-digits');


    const removeZeros = (val) => {
      let split = val.split('.');
      return split[1] !== '00' ? val : split[0];
    };

    const addCopyListener = (ele, val) => {
      ele.addEventListener('click', () => {
        navigator.clipboard.writeText(removeZeros(val.textContent));
      });
    };

    addCopyListener(taxBtn, taxAmt);
    addCopyListener(costWithTaxBtn, costWithTax);
    addCopyListener(costWithoutTaxBtn, costWithoutTax);
  }

}