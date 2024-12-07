import dateController from "./date-calculator";
import { cpmController } from "./cpm-calculator";
import './styles/main.css';
import './styles/date-calculator.css';
import './styles/cpm-calculator.css';

const startDate = '2025-06-02';
const dateInterface = dateController(startDate);
window.dateInterface = dateInterface;

const cpm = cpmController();
window.cpm = cpm;