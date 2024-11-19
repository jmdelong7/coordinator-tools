import dateController from "./date-calculator";
import cpmController from "./cpm-calculator";
import './styles/main.css';
import './styles/date-calculator.css';

const startDate = '2024-09-23';
const dateInterface = dateController(startDate);
window.dateInterface = dateInterface;

const cpm = cpmController();
window.cpm = cpm;