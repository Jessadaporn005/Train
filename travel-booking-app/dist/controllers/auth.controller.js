"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    async register(req, res) {
        const data = req.body;
        try {
            const user = await this.authService.register(data);
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    async login(req, res) {
        const data = req.body;
        try {
            const result = await this.authService.login(data);
            if (!result)
                return res.status(401).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}
exports.AuthController = AuthController;
