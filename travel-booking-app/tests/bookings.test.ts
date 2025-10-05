import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { Booking } from '../src/models/booking.model'; // Adjust the path as necessary

describe('Bookings API', () => {
  let bookingId;

  beforeAll(async () => {
    // Setup code to run before tests, e.g., clearing the database
  });

  afterAll(async () => {
    // Cleanup code to run after tests, e.g., closing database connections
  });

  it('should create a new booking', async () => {
    const bookingData = {
      userId: '12345',
      hotelId: '67890',
      checkInDate: '2023-10-01',
      checkOutDate: '2023-10-05',
      guests: 2,
    };

    const response = await request(app)
      .post('/api/bookings')
      .send(bookingData)
      .expect(201);

    bookingId = response.body.id;
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(bookingData.userId);
  });

  it('should retrieve a booking by ID', async () => {
    const response = await request(app)
      .get(`/api/bookings/${bookingId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', bookingId);
  });

  it('should update a booking', async () => {
    const updatedData = {
      guests: 3,
    };

    const response = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('guests', updatedData.guests);
  });

  it('should delete a booking', async () => {
    await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .expect(204);

    const response = await request(app)
      .get(`/api/bookings/${bookingId}`)
      .expect(404);
  });
});