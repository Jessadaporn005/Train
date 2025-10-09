import { sign, verify } from 'jsonwebtoken';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { refreshTokenRepository, userRepository } from '../repositories';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { DuplicateEmailError, InvalidCredentialsError, PasswordMismatchError, InvalidRefreshTokenError, ExpiredRefreshTokenError } from '../errors/domain.errors';
import { authLoginsTotal, authLoginFailuresTotal } from '../utils/metrics';
import { auditLog } from '../utils/logger';

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

    async login(data: LoginDto): Promise<{ token: string, refreshToken: string } | null> {
        const user = await userRepository.findByEmail(data.email);
        if (!user) {
            authLoginFailuresTotal.inc();
            throw new InvalidCredentialsError();
        }
        const ok = await bcrypt.compare(data.password, user.password);
        if (!ok) {
            authLoginFailuresTotal.inc();
            throw new InvalidCredentialsError();
        }
        authLoginsTotal.inc();
        auditLog('login', { userId: user.id, email: user.email });
        const token = this.generateToken(user);
        const refreshToken = await this.generateRefreshToken(user.id);
        return { token, refreshToken };
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

    private async generateRefreshToken(userId: string) {
        const ttlDays = Number(process.env.REFRESH_TTL_DAYS || 7);
        const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
        const token = Buffer.from(`${userId}:${Date.now()}:${Math.random().toString(36).slice(2)}`).toString('base64url');
        await refreshTokenRepository.create(userId, token, expiresAt);
        return token;
    }

    public async refresh(refreshToken: string): Promise<{ token: string }>{
        const record = await refreshTokenRepository.findByToken(refreshToken);
        if (!record) throw new InvalidRefreshTokenError();
        if (record.revokedAt) throw new InvalidRefreshTokenError();
        if (record.expiresAt.getTime() < Date.now()) throw new ExpiredRefreshTokenError();
        const user = await userRepository.findById(record.userId);
        if (!user) throw new InvalidRefreshTokenError();
        return { token: this.generateToken(user) };
    }

    public async logout(userId: string): Promise<void> {
        await refreshTokenRepository.deleteByUser(userId);
        auditLog('logout', { userId });
    }
}
