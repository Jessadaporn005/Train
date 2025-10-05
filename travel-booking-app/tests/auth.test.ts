import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { createUser, loginUser } from '../src/services/auth.service'; // Adjust the path as necessary

describe('Authentication Routes', () => {
  let user;

  beforeAll(async () => {
    user = await createUser({
      username: 'testuser',
      password: 'testpassword',
      email: 'testuser@example.com',
    });
  });

  afterAll(async () => {
    // Clean up user after tests
    await user.remove(); // Adjust according to your user model
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        password: 'newpassword',
        email: 'newuser@example.com',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail to login with incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});