import { server } from '../index';
import request from 'supertest';
import { User } from '../../server/data';
import { Endpoints } from '../constants/endpoints';
import { ErrorMessages } from '../constants/errorMessages';
import { StatusCode } from '../constants/statusCode';

describe('API Tests 02', () => {
  let userId: string = '';

  test('should create and get list of users', async () => {
    const users = [
      { username: 'Alice', age: 25, hobbies: ['Reading'] },
      { username: 'Bob', age: 30, hobbies: ['Gaming'] },
      { username: 'Charlie', age: 35, hobbies: ['Cooking'] },
    ];

    const createPromises = users.map((user) =>
      request(server).post(Endpoints.USERS).send(user),
    );
    await Promise.all(createPromises);

    const response = await request(server).get(Endpoints.USERS);
    expect(response.status).toBe(StatusCode.OK);
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
      .post(Endpoints.USERS)
      .send(user);

    userId = createUserResponse.body.id;

    const deleteResponse = await request(server).delete(
      `${Endpoints.USERS}/${userId}`,
    );
    expect(deleteResponse.status).toBe(StatusCode.NO_CONTENT);
  });

  test('should try delete an invalid user', async () => {
    const deleteAgainResponse = await request(server).delete(
      `${Endpoints.USERS}/${userId}`,
    );
    expect(deleteAgainResponse.status).toBe(StatusCode.NOT_FOUND);
    expect(deleteAgainResponse.body).toEqual({
      message: ErrorMessages.USER_NOT_FOUND,
      statusCode: StatusCode.NOT_FOUND,
    });
  });

  test('should not update a deleted user', async () => {
    const updatedUser = {
      username: 'Updated Bob',
      age: 35,
      hobbies: ['Coding'],
    };
    const updateResponse = await request(server)
      .put(`${Endpoints.USERS}/${userId}`)
      .send(updatedUser);

    expect(updateResponse.status).toBe(StatusCode.NOT_FOUND);
    expect(updateResponse.body).toEqual({
      message: ErrorMessages.USER_NOT_FOUND,
      statusCode: StatusCode.NOT_FOUND,
    });
  });
});
