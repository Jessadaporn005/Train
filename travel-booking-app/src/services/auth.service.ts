import { sign, verify } from 'jsonwebtoken';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { userRepository } from '../repositories';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { DuplicateEmailError, InvalidCredentialsError, PasswordMismatchError } from '../errors/domain.errors';

export class AuthService {
    async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
        if (data.password !== data.confirmPassword) {
            throw new PasswordMismatchError();
        }
        const existing = await userRepository.findByEmail(data.email);
        if (existing) throw new DuplicateEmailError(data.email);
        const hash = await bcrypt.hash(data.password, 10);
        const user = await userRepository.create({
            username: data.username,
            email: data.email,
            password: hash
        });
        // ไม่คืน password ออกไป
        const { password, ...safe } = user;
        return safe;
    }

    async login(data: LoginDto): Promise<{ token: string } | null> {
        const user = await userRepository.findByEmail(data.email);
    if (!user) throw new InvalidCredentialsError();
        const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) throw new InvalidCredentialsError();
        return { token: this.generateToken(user) };
    }

    private generateToken(user: User): string {
        const payload = { email: user.email, id: user.id };
        return sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    }

    verifyToken(token: string): any {
        try {
            return verify(token, process.env.JWT_SECRET || 'secret');
        } catch (error) {
            return null;
        }
    }
}
