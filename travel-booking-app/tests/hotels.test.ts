import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { Hotel } from '../src/models/hotel.model'; // Adjust the path as necessary

describe('Hotels API', () => {
  beforeAll(async () => {
    // Setup database connection and seed data if necessary
  });

  afterAll(async () => {
    // Cleanup database connection
  });

  it('should create a new hotel', async () => {
    const hotelData = {
      name: 'Test Hotel',
      location: 'Test Location',
      price: 100,
      rating: 4.5,
    };

    const response = await request(app)
      .post('/api/hotels') // Adjust the route as necessary
      .send(hotelData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(hotelData.name);
  });

  it('should get a list of hotels', async () => {
    const response = await request(app)
      .get('/api/hotels') // Adjust the route as necessary
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a hotel by ID', async () => {
    const hotel = await Hotel.create({
      name: 'Another Test Hotel',
      location: 'Another Test Location',
      price: 150,
      rating: 4.0,
    });

    const response = await request(app)
      .get(`/api/hotels/${hotel.id}`) // Adjust the route as necessary
      .expect(200);

    expect(response.body).toHaveProperty('id', hotel.id);
  });

  it('should update a hotel', async () => {
    const hotel = await Hotel.create({
      name: 'Hotel to Update',
      location: 'Location to Update',
      price: 120,
      rating: 3.5,
    });

    const updatedData = {
      name: 'Updated Hotel',
      location: 'Updated Location',
      price: 130,
      rating: 4.2,
    };

    const response = await request(app)
      .put(`/api/hotels/${hotel.id}`) // Adjust the route as necessary
      .send(updatedData)
      .expect(200);

    expect(response.body.name).toBe(updatedData.name);
  });

  it('should delete a hotel', async () => {
    const hotel = await Hotel.create({
      name: 'Hotel to Delete',
      location: 'Location to Delete',
      price: 90,
      rating: 4.1,
    });

    await request(app)
      .delete(`/api/hotels/${hotel.id}`) // Adjust the route as necessary
      .expect(204);
  });
});