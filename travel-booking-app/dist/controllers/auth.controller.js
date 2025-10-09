"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const repositories_1 = require("../repositories");
const domain_errors_1 = require("../errors/domain.errors");
const schemas_1 = require("../validators/schemas");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    async register(req, res) {
        const data = req.body;
        const user = await this.authService.register(data);
        return (0, response_1.created)(res, user);
    }
    async login(req, res) {
        const data = req.body;
        const result = await this.authService.login(data);
        return (0, response_1.success)(res, result);
    }
    async me(req, res) {
        const userId = req.userId;
        const user = await repositories_1.userRepository.findById(userId);
        if (!user)
            throw new domain_errors_1.UserNotFoundError(userId);
        const { password, ...safe } = user;
        return (0, response_1.success)(res, safe);
    }
    async refresh(req, res) {
        const parsed = schemas_1.refreshSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid refresh request', details: parsed.error.flatten() } });
        }
        const { refreshToken } = parsed.data;
        const result = await this.authService.refresh(refreshToken);
        return (0, response_1.success)(res, result);
    }
    async logout(req, res) {
        const userId = req.userId;
        await this.authService.logout(userId);
        return (0, response_1.success)(res, { ok: true });
    }
}
exports.AuthController = AuthController;
