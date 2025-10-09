"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const repositories_1 = require("../repositories");
const domain_errors_1 = require("../errors/domain.errors");
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
}
exports.AuthController = AuthController;
