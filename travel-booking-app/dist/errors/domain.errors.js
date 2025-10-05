"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = exports.BookingNotFoundError = exports.RestaurantNotFoundError = exports.AttractionNotFoundError = exports.HotelNotFoundError = exports.InvalidCredentialsError = exports.PasswordMismatchError = exports.DuplicateEmailError = void 0;
const app_error_1 = require("./app.error");
class DuplicateEmailError extends app_error_1.AppError {
    constructor(email) { super(`อีเมลถูกใช้แล้ว: ${email}`, 400, 'DUPLICATE_EMAIL'); }
}
exports.DuplicateEmailError = DuplicateEmailError;
class PasswordMismatchError extends app_error_1.AppError {
    constructor() { super('รหัสผ่านไม่ตรงกัน', 400, 'PASSWORD_MISMATCH'); }
}
exports.PasswordMismatchError = PasswordMismatchError;
class InvalidCredentialsError extends app_error_1.AppError {
    constructor() { super('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 401, 'INVALID_CREDENTIALS'); }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class HotelNotFoundError extends app_error_1.AppError {
    constructor(id) { super(`ไม่พบโรงแรม id=${id}`, 404, 'HOTEL_NOT_FOUND'); }
}
exports.HotelNotFoundError = HotelNotFoundError;
class AttractionNotFoundError extends app_error_1.AppError {
    constructor(id) { super(`ไม่พบแหล่งท่องเที่ยว id=${id}`, 404, 'ATTRACTION_NOT_FOUND'); }
}
exports.AttractionNotFoundError = AttractionNotFoundError;
class RestaurantNotFoundError extends app_error_1.AppError {
    constructor(id) { super(`ไม่พบร้านอาหาร id=${id}`, 404, 'RESTAURANT_NOT_FOUND'); }
}
exports.RestaurantNotFoundError = RestaurantNotFoundError;
class BookingNotFoundError extends app_error_1.AppError {
    constructor(id) { super(`ไม่พบการจอง id=${id}`, 404, 'BOOKING_NOT_FOUND'); }
}
exports.BookingNotFoundError = BookingNotFoundError;
class UserNotFoundError extends app_error_1.AppError {
    constructor(id) { super(`ไม่พบผู้ใช้ id=${id}`, 404, 'USER_NOT_FOUND'); }
}
exports.UserNotFoundError = UserNotFoundError;
