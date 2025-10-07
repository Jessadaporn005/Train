"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const repositories_1 = require("../repositories");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const domain_errors_1 = require("../errors/domain.errors");
const metrics_1 = require("../utils/metrics");
const logger_1 = require("../utils/logger");
class AuthService {
    async register(data) {
        if (data.password !== data.confirmPassword) {
            throw new domain_errors_1.PasswordMismatchError();
        }
        const existing = await repositories_1.userRepository.findByEmail(data.email);
        if (existing)
            throw new domain_errors_1.DuplicateEmailError(data.email);
        const hash = await bcryptjs_1.default.hash(data.password, 10);
        const user = await repositories_1.userRepository.create({
            username: data.username,
            email: data.email,
            password: hash
        });
        // ไม่คืน password ออกไป
        const { password, ...safe } = user;
        return safe;
    }
    async login(data) {
        const user = await repositories_1.userRepository.findByEmail(data.email);
        if (!user) {
            metrics_1.authLoginFailuresTotal.inc();
            throw new domain_errors_1.InvalidCredentialsError();
        }
        const ok = await bcryptjs_1.default.compare(data.password, user.password);
        if (!ok) {
            metrics_1.authLoginFailuresTotal.inc();
            throw new domain_errors_1.InvalidCredentialsError();
        }
        metrics_1.authLoginsTotal.inc();
        (0, logger_1.auditLog)('login', { userId: user.id, email: user.email });
        return { token: this.generateToken(user) };
    }
    generateToken(user) {
        const payload = { email: user.email, id: user.id };
        return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    }
    verifyToken(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || 'secret');
        }
        catch (error) {
            return null;
        }
    }
}
exports.AuthService = AuthService;
