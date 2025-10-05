"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("../services/users.service");
class UsersController {
    constructor() {
        this.usersService = new users_service_1.UsersService();
    }
    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.usersService.getUserById(userId);
            return res.status(200).json(user);
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
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error updating user' });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await this.usersService.deleteUser(userId);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ message: 'Error deleting user' });
        }
    }
}
exports.UsersController = UsersController;
