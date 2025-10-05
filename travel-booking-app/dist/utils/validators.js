"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateUsername = validateUsername;
exports.validateBookingDates = validateBookingDates;
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
    return password.length >= 6;
}
function validateUsername(username) {
    const re = /^[a-zA-Z0-9_]{3,30}$/;
    return re.test(username);
}
function validateBookingDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start < end;
}
