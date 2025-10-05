"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
class UsersService {
    constructor() {
        this.users = [];
    }
    createUser(user) {
        this.users.push(user);
        return user;
    }
    getUserById(userId) {
        return this.users.find(user => user.id === userId);
    }
    updateUser(userId, updatedUser) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
            return this.users[userIndex];
        }
        return undefined;
    }
    deleteUser(userId) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
    getAllUsers() {
        return this.users;
    }
}
exports.UsersService = UsersService;
