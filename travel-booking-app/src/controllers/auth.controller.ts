import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { created, success } from '../utils/response';
import { userRepository } from '../repositories';
import { UserNotFoundError } from '../errors/domain.errors';
import { refreshSchema } from '../validators/schemas';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async register(req: Request, res: Response): Promise<Response> {
        const data: RegisterDto = req.body;
        const user = await this.authService.register(data);
        return created(res, user);
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const data: LoginDto = req.body;
        const result = await this.authService.login(data);
        return success(res, result);
    }

    public async me(req: Request, res: Response): Promise<Response> {
        const userId = req.userId as string;
        const user = await userRepository.findById(userId);
        if (!user) throw new UserNotFoundError(userId);
        const { password, ...safe } = user as any;
        return success(res, safe);
    }

    public async refresh(req: Request, res: Response): Promise<Response> {
        const parsed = refreshSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid refresh request', details: parsed.error.flatten() } });
        }
        const { refreshToken } = parsed.data;
        const result = await this.authService.refresh(refreshToken);
        return success(res, result);
    }

    public async logout(req: Request, res: Response): Promise<Response> {
        const userId = req.userId as string;
        await this.authService.logout(userId);
        return success(res, { ok: true });
    }
}