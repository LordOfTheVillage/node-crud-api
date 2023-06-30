import { v4 as uuidv4 } from 'uuid';

export const users = [
  {
    id: uuidv4(),
    username: 'John Doe',
    age: 30,
    hobbies: ['Reading', 'Gaming'],
  },
  {
    id: uuidv4(),
    username: 'Jane Smith',
    age: 25,
    hobbies: ['Cooking', 'Hiking'],
  },
];

export const addUser = (username: string, age: number, hobbies: string[]) => {
  const newUser = {
    id: uuidv4(),
    username,
    age,
    hobbies: hobbies,
  };

  users.push(newUser);
  return newUser;
};

export const updateUser = (
  userId: string,
  username: string,
  age: number,
  hobbies: string[],
) => {
  const userToUpdate = users.find((user) => user.id === userId);

  if (!userToUpdate) {
    return null;
  }

  userToUpdate.username = username || userToUpdate.username;
  userToUpdate.age = age || userToUpdate.age;
  userToUpdate.hobbies = hobbies || userToUpdate.hobbies;

  return userToUpdate;
};

export const deleteUser = (userId: string) => {
  const userToDelete = users.find((user) => user.id === userId);

  if (!userToDelete) {
    return null;
  }

  users.splice(users.indexOf(userToDelete), 1);
  return userToDelete;
};
