"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttractionsService = void 0;
class AttractionsService {
    constructor() {
        this.attractions = [];
        this.attractions = [
            { id: '1', name: 'Grand Canyon', description: 'A stunning natural wonder.', location: 'Arizona, USA' },
            { id: '2', name: 'Eiffel Tower', description: 'An iconic symbol of Paris.', location: 'Paris, France' },
            { id: '3', name: 'Great Wall of China', description: 'A historic wall stretching across northern China.', location: 'China' },
        ];
    }
    getAllAttractions() {
        return this.attractions;
    }
    getAttractionById(id) {
        return this.attractions.find(attraction => attraction.id === id) || null;
    }
    addAttraction(attraction) {
        const newItem = { id: (this.attractions.length + 1).toString(), ...attraction };
        this.attractions.push(newItem);
        return newItem;
    }
    updateAttraction(id, updatedAttraction) {
        const index = this.attractions.findIndex(attraction => attraction.id === id);
        if (index === -1)
            return null;
        this.attractions[index] = { ...this.attractions[index], ...updatedAttraction };
        return this.attractions[index];
    }
    deleteAttraction(id) {
        const before = this.attractions.length;
        this.attractions = this.attractions.filter(attraction => attraction.id !== id);
        return this.attractions.length < before;
    }
}
exports.AttractionsService = AttractionsService;
