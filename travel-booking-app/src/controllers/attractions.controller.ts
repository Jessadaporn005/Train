import { Request, Response } from 'express';
import { AttractionsService } from '../services/attractions.service';

export class AttractionsController {
    private attractionsService: AttractionsService;

    constructor() {
        this.attractionsService = new AttractionsService();
    }

    public async getAllAttractions(req: Request, res: Response): Promise<void> {
        try {
            const attractions = await this.attractionsService.getAllAttractions();
            res.status(200).json(attractions);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attractions', error });
        }
    }

    public async getAttractionById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
                const attraction = await this.attractionsService.getAttractionById(id);
                if (!attraction) { res.status(404).json({ message: 'Attraction not found' }); return; }
                res.status(200).json(attraction); return;
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction', error });
        }
    }

    public async createAttraction(req: Request, res: Response): Promise<void> {
        try {
            const newAttraction = await this.attractionsService.addAttraction(req.body);
            res.status(201).json(newAttraction);
        } catch (error) {
            res.status(500).json({ message: 'Error creating attraction', error });
        }
    }

    public async updateAttraction(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
                const updated = await this.attractionsService.updateAttraction(id, req.body);
                if (!updated) { res.status(404).json({ message: 'Attraction not found' }); return; }
                res.status(200).json(updated); return;
        } catch (error) {
            res.status(500).json({ message: 'Error updating attraction', error });
        }
    }

    public async deleteAttraction(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
                const deleted = await this.attractionsService.deleteAttraction(id);
                if (!deleted) { res.status(404).json({ message: 'Attraction not found' }); return; }
                res.status(204).send(); return;
        } catch (error) {
            res.status(500).json({ message: 'Error deleting attraction', error });
        }
    }
}