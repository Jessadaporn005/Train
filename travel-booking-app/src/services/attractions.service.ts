export class AttractionsService {
    private attractions: any[] = [];

    constructor() {
        this.attractions = [
            { id: '1', name: 'Grand Canyon', description: 'A stunning natural wonder.', location: 'Arizona, USA' },
            { id: '2', name: 'Eiffel Tower', description: 'An iconic symbol of Paris.', location: 'Paris, France' },
            { id: '3', name: 'Great Wall of China', description: 'A historic wall stretching across northern China.', location: 'China' },
        ];
    }

    public getAllAttractions() {
        return this.attractions;
    }

    public getAttractionById(id: string) {
        return this.attractions.find(attraction => attraction.id === id) || null;
    }

    public addAttraction(attraction: any) {
        const newItem = { id: (this.attractions.length + 1).toString(), ...attraction };
        this.attractions.push(newItem);
        return newItem;
    }

    public updateAttraction(id: string, updatedAttraction: any) {
        const index = this.attractions.findIndex(attraction => attraction.id === id);
        if (index === -1) return null;
        this.attractions[index] = { ...this.attractions[index], ...updatedAttraction };
        return this.attractions[index];
    }

    public deleteAttraction(id: string) {
        const before = this.attractions.length;
        this.attractions = this.attractions.filter(attraction => attraction.id !== id);
        return this.attractions.length < before;
    }
}