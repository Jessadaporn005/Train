export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Combined (optional) convenience type (not strictly needed but helpful in controllers)
export type AuthInput = LoginDto | RegisterDto;
