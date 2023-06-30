import { v4 as uuidv4 } from 'uuid';

export let users = [
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