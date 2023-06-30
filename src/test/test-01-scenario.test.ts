import request from 'supertest';
import { server } from '../index';

describe('API tests', () => {
  let createdUserId: string; // To store the ID of the created user for later use

  test('GET api/users should return an empty array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST api/users should create a new user', async () => {
    const newUser = {
      username: 'JohnDoe',
      age: 30,
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(server).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdUserId = response.body.id; // Store the created user ID for later use
  });

  test('GET api/users/{userId} should get the created user', async () => {
    const response = await request(server).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUserId);
  });

  test('PUT api/users/{userId} should update the created user', async () => {
    const updatedUser = {
      username: 'JohnDoe',
      age: 35,
      hobbies: ['Reading', 'Gaming', 'Coding'],
    };

    const response = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUserId);
    expect(response.body.age).toBe(35);
    expect(response.body.hobbies).toEqual(['Reading', 'Gaming', 'Coding']);
  });

  test('DELETE api/users/{userId} should delete the created user', async () => {
    const response = await request(server).delete(
      `/api/users/${createdUserId}`,
    );
    expect(response.status).toBe(204);
  });

  test('GET api/users/{userId} should return 404 for the deleted user', async () => {
    const response = await request(server).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
