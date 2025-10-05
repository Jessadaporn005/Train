import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { UpdateUserDTO } from '../dtos/user.dto';
import { success, noContent } from '../utils/response';
import { UserNotFoundError } from '../errors/domain.errors';

export class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const user = await this.usersService.getUserById(userId);
            if (!user) throw new UserNotFoundError(userId);
            return success(res, user);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving user' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const userData: UpdateUserDTO = req.body;
            const updatedUser = await this.usersService.updateUser(userId, userData);
            if (!updatedUser) throw new UserNotFoundError(userId);
            return success(res, updatedUser);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const deleted = this.usersService.deleteUser(userId);
            if (!deleted) throw new UserNotFoundError(userId);
            return noContent(res);
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting user' });
        }
    }
}