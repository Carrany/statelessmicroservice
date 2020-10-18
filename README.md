A simple stateless microservice in Nodejs, with two major functionalities -

Authentication - This is a mock authentication so you can pass in any username or password to login.

JSON patching - Apply json patch to a json object, and return the resulting json object

Setup

Steps include:

1. Clone the repo.

2. Install the dependencies. They include:

# Install dependencies for server
cd server && npm install

# Install dependencies for client
cd client && npm install

3. Create a .env file in the server folder and set jwtSecret to any variable you prefer.

4. To run the app:

# Run the server
cd server && npm run dev

# Run the client
cd client && npm start

# Server runs on http://localhost:5000 and client on http://localhost:3000


Testing
Testing is done using mocha.

Run npm test from the application's root directory.

Logging
All logs are saved in file.log at the root folder.

Built With
Node.js
Express
Mocha - For testing
ReactJs