import Controller from "./controller";

const startDateId = 'start-date';
const endDateId = 'end-date';
const daysId = 'days';
const weeksId = 'weeks';
const periods = 'periods';

const sd = new Date(2024, 11, 30);
console.log(sd);

const controller = new Controller(sd, startDateId, endDateId, daysId, weeksId, periods);
window.controller = controller;