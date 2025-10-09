import { AppError } from './app.error';

export class DuplicateEmailError extends AppError {
  constructor(email: string) { super(`อีเมลถูกใช้แล้ว: ${email}`, 400, 'DUPLICATE_EMAIL'); }
}
export class PasswordMismatchError extends AppError {
  constructor() { super('รหัสผ่านไม่ตรงกัน', 400, 'PASSWORD_MISMATCH'); }
}
export class InvalidCredentialsError extends AppError {
  constructor() { super('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 401, 'INVALID_CREDENTIALS'); }
}
export class HotelNotFoundError extends AppError {
  constructor(id: string) { super(`ไม่พบโรงแรม id=${id}`, 404, 'HOTEL_NOT_FOUND'); }
}
export class AttractionNotFoundError extends AppError {
  constructor(id: string) { super(`ไม่พบแหล่งท่องเที่ยว id=${id}`, 404, 'ATTRACTION_NOT_FOUND'); }
}
export class RestaurantNotFoundError extends AppError {
  constructor(id: string) { super(`ไม่พบร้านอาหาร id=${id}`, 404, 'RESTAURANT_NOT_FOUND'); }
}
export class BookingNotFoundError extends AppError {
  constructor(id: string) { super(`ไม่พบการจอง id=${id}`, 404, 'BOOKING_NOT_FOUND'); }
}
export class UserNotFoundError extends AppError {
  constructor(id: string) { super(`ไม่พบผู้ใช้ id=${id}`, 404, 'USER_NOT_FOUND'); }
}

export class InvalidRefreshTokenError extends AppError {
  constructor() { super('refresh token ไม่ถูกต้อง', 401, 'INVALID_REFRESH_TOKEN'); }
}
export class ExpiredRefreshTokenError extends AppError {
  constructor() { super('refresh token หมดอายุ', 401, 'EXPIRED_REFRESH_TOKEN'); }
}
