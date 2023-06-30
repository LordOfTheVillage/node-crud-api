import request from 'supertest';
import { server } from '../index';
import { Endpoints } from '../constants/endpoints';
import { StatusCode } from '../constants/statusCode';

describe('API tests 01', () => {
  let createdUserId: string;

  test('GET api/users should return an empty array', async () => {
    const response = await request(server).get(Endpoints.USERS);
    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toEqual([]);
  });

  test('POST api/users should create a new user', async () => {
    const newUser = {
      username: 'JohnDoe',
      age: 30,
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(server).post(Endpoints.USERS).send(newUser);
    expect(response.status).toBe(StatusCode.CREATED);
    expect(response.body).toHaveProperty('id');
    createdUserId = response.body.id;
  });

  test('GET api/users/{userId} should get the created user', async () => {
    const response = await request(server).get(
      `${Endpoints.USERS}/${createdUserId}`,
    );
    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.id).toBe(createdUserId);
  });

  test('PUT api/users/{userId} should update the created user', async () => {
    const updatedUser = {
      username: 'JohnDoe',
      age: 35,
      hobbies: ['Reading', 'Gaming', 'Coding'],
    };

    const response = await request(server)
      .put(`${Endpoints.USERS}/${createdUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.id).toBe(createdUserId);
    expect(response.body.age).toBe(updatedUser.age);
    expect(response.body.hobbies).toEqual(updatedUser.hobbies);
  });

  test('DELETE api/users/{userId} should delete the created user', async () => {
    const response = await request(server).delete(
      `${Endpoints.USERS}/${createdUserId}`,
    );
    expect(response.status).toBe(StatusCode.NO_CONTENT);
  });

  test('GET api/users/{userId} should return 404 for the deleted user', async () => {
    const response = await request(server).get(
      `${Endpoints.USERS}/${createdUserId}`,
    );
    expect(response.status).toBe(StatusCode.NOT_FOUND);
    expect(response.body).toHaveProperty('message');
  });
});
