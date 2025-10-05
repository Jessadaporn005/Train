import { User } from '../models/user.model';

export class UsersService {
    private users: User[] = [];

    public createUser(user: User): User {
        this.users.push(user);
        return user;
    }

    public getUserById(userId: string): User | undefined {
        return this.users.find(user => user.id === userId);
    }

    public updateUser(userId: string, updatedUser: Partial<User>): User | undefined {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
            return this.users[userIndex];
        }
        return undefined;
    }

    public deleteUser(userId: string): boolean {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }

    public getAllUsers(): User[] {
        return this.users;
    }
}