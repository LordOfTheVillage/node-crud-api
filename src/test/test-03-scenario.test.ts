import request from 'supertest';
import { server } from '../index';
import { v4 as uuidv4 } from 'uuid';

describe('API Tests 03', () => {
  test('should get a user by ID', async () => {
    const user = { username: 'Alice', age: 25, hobbies: ['Reading'] };
    const createUserResponse = await request(server)
      .post('/api/users')
      .send(user);

    const userId = createUserResponse.body.id;

    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);

    const returnedUser = response.body;
    expect(returnedUser.id).toBe(userId);
    expect(returnedUser.username).toBe(user.username);
    expect(returnedUser.age).toBe(user.age);
    expect(returnedUser.hobbies).toEqual(user.hobbies);
  });

  test('should return 400 for invalid user ID', async () => {
    const response = await request(server).get('/api/users/invalid-id');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid user ID.',
      statusCode: 400,
    });
  });

  test('should return 404 for non-existent user ID', async () => {
    const nonExistentUserId = uuidv4();
    const response = await request(server).get(
      `/api/users/${nonExistentUserId}`,
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'User not found.',
      statusCode: 404,
    });
  });
});
