import { Request, Response } from 'express';
import { AttractionsService } from '../services/attractions.service';
import { success, created, noContent } from '../utils/response';
import { AttractionNotFoundError } from '../errors/domain.errors';

export class AttractionsController {
    private attractionsService: AttractionsService;

    constructor() {
        this.attractionsService = new AttractionsService();
    }

    public async getAllAttractions(req: Request, res: Response): Promise<void> {
        try {
            const attractions = await this.attractionsService.getAllAttractions();
            success(res, attractions);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attractions', error });
        }
    }

    public async getAttractionById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
                const attraction = await this.attractionsService.getAttractionById(id);
                if (!attraction) throw new AttractionNotFoundError(id);
                success(res, attraction); return;
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction', error });
        }
    }

    public async createAttraction(req: Request, res: Response): Promise<void> {
        try {
            const newAttraction = await this.attractionsService.addAttraction(req.body);
            created(res, newAttraction);
        } catch (error) {
            res.status(500).json({ message: 'Error creating attraction', error });
        }
    }

    public async updateAttraction(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
                const updated = await this.attractionsService.updateAttraction(id, req.body);
                if (!updated) throw new AttractionNotFoundError(id);
                success(res, updated); return;
        } catch (error) {
            res.status(500).json({ message: 'Error updating attraction', error });
        }
    }

    public async deleteAttraction(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
                const deleted = await this.attractionsService.deleteAttraction(id);
                if (!deleted) throw new AttractionNotFoundError(id);
                noContent(res); return;
        } catch (error) {
            res.status(500).json({ message: 'Error deleting attraction', error });
        }
    }
}