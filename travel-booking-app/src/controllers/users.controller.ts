import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { UpdateUserDTO } from '../dtos/user.dto';

export class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const user = await this.usersService.getUserById(userId);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving user' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const userData: UpdateUserDTO = req.body;
            const updatedUser = await this.usersService.updateUser(userId, userData);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            await this.usersService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting user' });
        }
    }
}