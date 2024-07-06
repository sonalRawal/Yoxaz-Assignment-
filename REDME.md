# Financial Portfolio Management API

## Introduction
This is a RESTful API for managing financial portfolios. It allows users to create transactions, view their portfolio, and retrieve transaction history.

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your environment variables (see `.env.example`)
4. Run the server:
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## Usage
The API provides the following endpoints:

- POST /api/v1/auth/register - Register a new user
- POST /api/v1/auth/login - Login a user
- POST /api/v1/transactions - Create a new financial transaction
- GET /api/v1/portfolio - Retrieve the current state of the user's portfolio
- GET /api/v1/portfolio/history - Retrieve the transaction history

All endpoints except register and login require authentication. Include the JWT token in the Authorization header as a Bearer token.

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Testing
(Add instructions for running tests when you implement them)

## Environments
The application uses environment variables for configuration. See the `.env.example` file for required variables.

- Development: Use `npm run dev` to start the server with nodemon for auto-reloading
- Production: Use `npm start` to start the server

Ensure you set the appropriate environment variables before deploying to production.