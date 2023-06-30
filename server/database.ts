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
