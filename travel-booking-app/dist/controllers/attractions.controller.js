"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttractionsController = void 0;
const attractions_service_1 = require("../services/attractions.service");
const response_1 = require("../utils/response");
const domain_errors_1 = require("../errors/domain.errors");
class AttractionsController {
    constructor() {
        this.attractionsService = new attractions_service_1.AttractionsService();
    }
    async getAllAttractions(req, res) {
        try {
            const attractions = await this.attractionsService.getAllAttractions();
            (0, response_1.success)(res, attractions);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving attractions', error });
        }
    }
    async getAttractionById(req, res) {
        const { id } = req.params;
        try {
            const attraction = await this.attractionsService.getAttractionById(id);
            if (!attraction)
                throw new domain_errors_1.AttractionNotFoundError(id);
            (0, response_1.success)(res, attraction);
            return;
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction', error });
        }
    }
    async createAttraction(req, res) {
        try {
            const newAttraction = await this.attractionsService.addAttraction(req.body);
            (0, response_1.created)(res, newAttraction);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating attraction', error });
        }
    }
    async updateAttraction(req, res) {
        const { id } = req.params;
        try {
            const updated = await this.attractionsService.updateAttraction(id, req.body);
            if (!updated)
                throw new domain_errors_1.AttractionNotFoundError(id);
            (0, response_1.success)(res, updated);
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
            if (!deleted)
                throw new domain_errors_1.AttractionNotFoundError(id);
            (0, response_1.noContent)(res);
            return;
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting attraction', error });
        }
    }
}
exports.AttractionsController = AttractionsController;
