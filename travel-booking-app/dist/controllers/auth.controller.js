"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
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
}
exports.AuthController = AuthController;
