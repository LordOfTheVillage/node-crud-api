import request from 'supertest';
import { server } from '../index';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessages } from '../constants/errorMessages';
import { StatusCode } from '../constants/statusCode';
import { Endpoints } from '../constants/endpoints';

describe('API Tests 03', () => {
  test('should get a user by ID', async () => {
    const user = { username: 'Alice', age: 25, hobbies: ['Reading'] };
    const createUserResponse = await request(server)
      .post(Endpoints.USERS)
      .send(user);

    const userId = createUserResponse.body.id;

    const response = await request(server).get(`${Endpoints.USERS}/${userId}`);
    expect(response.status).toBe(200);

    const returnedUser = response.body;
    expect(returnedUser.id).toBe(userId);
    expect(returnedUser.username).toBe(user.username);
    expect(returnedUser.age).toBe(user.age);
    expect(returnedUser.hobbies).toEqual(user.hobbies);
  });

  test('should return 400 for invalid user ID', async () => {
    const response = await request(server).get(`${Endpoints.USERS}/invalid-id`);
    expect(response.status).toBe(StatusCode.BAD_REQUEST);
    expect(response.body).toEqual({
      message: ErrorMessages.INVALID_USER_ID,
      statusCode: StatusCode.BAD_REQUEST,
    });
  });

  test('should return 404 for non-existent user ID', async () => {
    const nonExistentUserId = uuidv4();
    const response = await request(server).get(
      `${Endpoints.USERS}/${nonExistentUserId}`,
    );
    expect(response.status).toBe(StatusCode.NOT_FOUND);
    expect(response.body).toEqual({
      message: ErrorMessages.USER_NOT_FOUND,
      statusCode: StatusCode.NOT_FOUND,
    });
  });
});
