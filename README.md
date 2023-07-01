# CRUD API
This is a Node.js project that implements a simple CRUD API using an in-memory database. The API allows you to perform basic CRUD operations on user records.

## Installation
Clone the repository:

~~~bash
git clone <repository-url>
~~~
Navigate to the project directory:

~~~bash
cd <project-directory>
~~~
Install the dependencies:

~~~bash
npm install
~~~
Create a .env file in the root directory and specify the port on which the application should run:

~~~makefile
PORT=4000
~~~

## Usage

### Development Mode
To run the application in development mode, use the following command:

~~~bash
npm run start:dev
~~~
This will start the application using ts-node-dev, which provides automatic restarts on file changes during development.

### Production Mode
To run the application in production mode, use the following command:

~~~bash
npm run start:prod
~~~
This will build the application using webpack and then run the bundled file using node.

### Horizontal Scaling
To run the application in multi-instance mode with horizontal scaling, use the following command:

~~~bash
npm run start:multi
~~~
This command will start multiple instances of the application using the Node.js. 
The number of instances will be equal to the number of available parallelism minus one on the host machine. 
Each instance will listen on a different port, starting from the specified PORT value and incrementing by one.

The load balancer listens for requests on `localhost:<PORT>/api` and distributes them across the worker instances using a Round-robin algorithm. 
Requests are evenly distributed among the workers to achieve load balancing.

The state of the database is consistent between different workers, 
ensuring that the data remains the same regardless of which worker processes the request.

## API Endpoints
The API provides the following endpoints for CRUD operations on user records:

- `GET api/users`: Retrieve all user records.
- `GET api/users/{userId}`: Retrieve a specific user record by ID.
- `POST api/users`: Create a new user record.
- `PUT api/users/{userId}`: Update an existing user record.
- `DELETE api/users/{userId}`: Delete a user record.
- The expected responses and error handling for each endpoint are described below:

### GET api/users
- Returns: Status code 200 and an array of all user records.
- Errors: Status code 404 if the endpoint is not found.
### GET api/users/{userId}
- Returns: Status code 200 and the user record with the specified ID if it exists.
- Errors:
  - Status code 400 if the userId parameter is invalid (not a valid UUID).
  - Status code 404 if a user record with the specified ID doesn't exist.
### POST api/users
Creates a new user record.
- Returns: Status code 201 and the newly created user record.
- Errors:
Status code 400 if the request body does not contain the required fields (username, age, hobbies).
### PUT api/users/{userId}
Updates an existing user record with the specified ID.
- Returns: Status code 200 and the updated user record.
- Errors:
  - Status code 400 if the userId parameter is invalid (not a valid UUID).
  - Status code 404 if a user record with the specified ID doesn't exist.
### DELETE api/users/{userId}
Deletes an existing user record with the specified ID.
- Returns: Status code 204 if the user record is found and deleted.
- Errors:
  - Status code 400 if the userId parameter is invalid (not a valid UUID).
  - Status code 404 if a user record with the specified ID doesn't exist.
## Error Handling
Requests to non-existing endpoints will return status code 404 and a corresponding human-friendly message.
Server-side errors during request processing will return status code 500 and a corresponding human-friendly message.
## Testing
The project includes tests for the API. There are three scenarios.
~~~bash
npm run test
~~~
The tests use the Jest framework and will run silently, providing the test results.

That's it! You're ready to use the CRUD API. Goodbye!