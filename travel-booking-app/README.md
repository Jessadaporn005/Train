# Travel Booking App

Welcome to the Travel Booking App! This application is designed to help users find and book accommodations, restaurants, and tourist attractions. It features user authentication, profile management, and a seamless booking experience.

## Features

- **User Authentication**: Users can register, log in, and manage their profiles.
- **Hotel Management**: Search for hotels, view details, and make bookings.
- **Restaurant Listings**: Discover restaurants, read reviews, and make reservations.
- **Attraction Information**: Explore tourist attractions and get detailed information.
- **Booking System**: Create and manage bookings for hotels and restaurants.

## Project Structure

The project is organized into several directories:

- `src`: Contains the main application code.
  - `app.ts`: Initializes the Express app and sets up middleware.
  - `server.ts`: Starts the server and listens for incoming requests.
  - `config`: Configuration settings for the application.
  - `routes`: Defines the API routes for various functionalities.
  - `controllers`: Contains the logic for handling requests and responses.
  - `services`: Business logic for different features.
  - `models`: Data models representing the application's data structure.
  - `middlewares`: Middleware functions for authentication and error handling.
  - `dtos`: Data transfer objects for structured data handling.
  - `utils`: Utility functions for logging and validation.
  - `database`: Database connection and migration files.
  - `types`: Custom TypeScript types.
  - `docs`: API specifications and documentation.

- `tests`: Contains unit tests for various functionalities.
- `package.json`: Lists dependencies and scripts for the project.
- `tsconfig.json`: TypeScript configuration file.
- `.env.example`: Example environment variables.
- `.gitignore`: Specifies files to be ignored by Git.
- `README.md`: Documentation for the project.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd travel-booking-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables by creating a `.env` file based on the `.env.example` file.

5. Start the server:
   ```
   npm start
   ```

## Docker Usage

You can run the API inside a container without installing Node.js globally (except for Docker itself):

### Build Image
```
docker build -t travel-booking-app .
```

### Run (in-memory mode)
```
docker run -p 3000:3000 -e USE_DB=false travel-booking-app
```

### Run with Postgres (future DB integration) via Compose
```
docker compose up --build
```
This will start:
- api (Node.js) on http://localhost:3000
- postgres (exposed on host port 5433)

Environment variables supplied in `docker-compose.yml` can be adjusted. When Prisma integration is added, uncomment the migrate command line in the compose file.

### Stop & Clean
```
docker compose down
docker compose down -v   # also remove volumes (DB data)
```

## Observability

Exposed endpoints:
- `/health` basic liveness
- `/ready` readiness stub (extend once DB added)
- `/metrics` Prometheus metrics (request counts, latencies, auth login counters)

Sample scrape config (Prometheus):
```yaml
scrape_configs:
   - job_name: 'travel_booking_app'
      static_configs:
         - targets: ['host.docker.internal:3000']
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.