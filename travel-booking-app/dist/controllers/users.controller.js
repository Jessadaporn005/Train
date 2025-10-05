"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("../services/users.service");
const response_1 = require("../utils/response");
const domain_errors_1 = require("../errors/domain.errors");
class UsersController {
    constructor() {
        this.usersService = new users_service_1.UsersService();
    }
    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.usersService.getUserById(userId);
            if (!user)
                throw new domain_errors_1.UserNotFoundError(userId);
            return (0, response_1.success)(res, user);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error retrieving user' });
        }
    }
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await this.usersService.updateUser(userId, userData);
            if (!updatedUser)
                throw new domain_errors_1.UserNotFoundError(userId);
            return (0, response_1.success)(res, updatedUser);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error updating user' });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deleted = this.usersService.deleteUser(userId);
            if (!deleted)
                throw new domain_errors_1.UserNotFoundError(userId);
            return (0, response_1.noContent)(res);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error deleting user' });
        }
    }
}
exports.UsersController = UsersController;
