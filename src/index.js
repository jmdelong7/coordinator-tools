import DateCalculator from "./date-calculator";

const sd = new Date(2024, 11, 30);
const w = 52;

const dateCalculator = new DateCalculator(sd, w)
window.dateCalculator = dateCalculator;