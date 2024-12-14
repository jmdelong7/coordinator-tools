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