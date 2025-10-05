"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttractionsController = void 0;
const attractions_service_1 = require("../services/attractions.service");
class AttractionsController {
    constructor() {
        this.attractionsService = new attractions_service_1.AttractionsService();
    }
    async getAllAttractions(req, res) {
        try {
            const attractions = await this.attractionsService.getAllAttractions();
            res.status(200).json(attractions);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving attractions', error });
        }
    }
    async getAttractionById(req, res) {
        const { id } = req.params;
        try {
            const attraction = await this.attractionsService.getAttractionById(id);
            if (!attraction) {
                res.status(404).json({ message: 'Attraction not found' });
                return;
            }
            res.status(200).json(attraction);
            return;
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction', error });
        }
    }
    async createAttraction(req, res) {
        try {
            const newAttraction = await this.attractionsService.addAttraction(req.body);
            res.status(201).json(newAttraction);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating attraction', error });
        }
    }
    async updateAttraction(req, res) {
        const { id } = req.params;
        try {
            const updated = await this.attractionsService.updateAttraction(id, req.body);
            if (!updated) {
                res.status(404).json({ message: 'Attraction not found' });
                return;
            }
            res.status(200).json(updated);
            return;
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating attraction', error });
        }
    }
    async deleteAttraction(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.attractionsService.deleteAttraction(id);
            if (!deleted) {
                res.status(404).json({ message: 'Attraction not found' });
                return;
            }
            res.status(204).send();
            return;
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting attraction', error });
        }
    }
}
exports.AttractionsController = AttractionsController;
