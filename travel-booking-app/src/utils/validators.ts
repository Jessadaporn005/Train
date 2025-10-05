export function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password: string): boolean {
    return password.length >= 6;
}

export function validateUsername(username: string): boolean {
    const re = /^[a-zA-Z0-9_]{3,30}$/;
    return re.test(username);
}

export function validateBookingDates(startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start < end;
}