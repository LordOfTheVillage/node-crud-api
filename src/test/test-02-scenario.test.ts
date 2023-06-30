import { server } from '../index';
import request from 'supertest';
import { User } from '../../server/data';

describe('API Tests 02', () => {
  let userId: string = '';

  test('should create and get list of users', async () => {
    const users = [
      { username: 'Alice', age: 25, hobbies: ['Reading'] },
      { username: 'Bob', age: 30, hobbies: ['Gaming'] },
      { username: 'Charlie', age: 35, hobbies: ['Cooking'] },
    ];

    const createPromises = users.map((user) =>
      request(server).post('/api/users').send(user),
    );
    await Promise.all(createPromises);

    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(users.length);

    for (let i = 0; i < users.length; i++) {
      const createdUser = users[i] as User;
      const returnedUser = response.body[i];
      expect(returnedUser.username).toBe(createdUser.username);
      expect(returnedUser.age).toBe(createdUser.age);
      expect(returnedUser.hobbies).toEqual(createdUser.hobbies);
    }
  });

  test('should delete a user', async () => {
    const user = { username: 'Alice', age: 25, hobbies: ['Reading'] };
    const createUserResponse = await request(server)
      .post('/api/users')
      .send(user);

    userId = createUserResponse.body.id;

    const deleteResponse = await request(server).delete(`/api/users/${userId}`);
    expect(deleteResponse.status).toBe(204);
  });

  test('should try delete an invalid user', async () => {
    const deleteAgainResponse = await request(server).delete(
      `/api/users/${userId}`,
    );
    expect(deleteAgainResponse.status).toBe(404);
    expect(deleteAgainResponse.body).toEqual({
      message: 'User not found.',
      statusCode: 404,
    });
  });

  test('should not update a deleted user', async () => {
    const updatedUser = {
      username: 'Updated Bob',
      age: 35,
      hobbies: ['Coding'],
    };
    const updateResponse = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(updateResponse.status).toBe(404);
    expect(updateResponse.body).toEqual({
      message: 'User not found.',
      statusCode: 404,
    });
  });
});
