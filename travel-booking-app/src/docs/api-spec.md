# API Specification Documentation

## Overview
This document provides an overview of the API endpoints available in the Travel Booking application. It includes details about authentication, user management, hotel management, restaurant management, attraction management, and booking management.

## Base URL
The base URL for all API endpoints is:
```
http://localhost:3000/api
```

## Authentication

### Login
- **Endpoint:** `/auth/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** Returns user details and authentication token.
  - **401 Unauthorized:** Invalid credentials.

### Register
- **Endpoint:** `/auth/register`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created:** Returns newly created user details.
  - **400 Bad Request:** Validation errors.

## Users

### Get User Profile
- **Endpoint:** `/users/profile`
- **Method:** GET
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Response:**
  - **200 OK:** Returns user profile details.
  - **401 Unauthorized:** Invalid token.

### Update User Profile
- **Endpoint:** `/users/profile`
- **Method:** PUT
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- **Response:**
  - **200 OK:** Returns updated user details.
  - **400 Bad Request:** Validation errors.

## Hotels

### Search Hotels
- **Endpoint:** `/hotels/search`
- **Method:** GET
- **Query Parameters:**
  - `location`: string
  - `checkIn`: date
  - `checkOut`: date
- **Response:**
  - **200 OK:** Returns a list of hotels matching the search criteria.

### Book Hotel
- **Endpoint:** `/hotels/book`
- **Method:** POST
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "hotelId": "string",
    "checkIn": "date",
    "checkOut": "date",
    "guests": "number"
  }
  ```
- **Response:**
  - **201 Created:** Returns booking details.
  - **400 Bad Request:** Validation errors.

## Restaurants

### List Restaurants
- **Endpoint:** `/restaurants`
- **Method:** GET
- **Response:**
  - **200 OK:** Returns a list of restaurants.

### Review Restaurant
- **Endpoint:** `/restaurants/review`
- **Method:** POST
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "restaurantId": "string",
    "rating": "number",
    "comment": "string"
  }
  ```
- **Response:**
  - **201 Created:** Returns review details.
  - **400 Bad Request:** Validation errors.

## Attractions

### List Attractions
- **Endpoint:** `/attractions`
- **Method:** GET
- **Response:**
  - **200 OK:** Returns a list of attractions.

### Get Attraction Details
- **Endpoint:** `/attractions/:id`
- **Method:** GET
- **Response:**
  - **200 OK:** Returns details of the specified attraction.
  - **404 Not Found:** Attraction not found.

## Bookings

### Create Booking
- **Endpoint:** `/bookings`
- **Method:** POST
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "hotelId": "string",
    "restaurantId": "string",
    "attractionId": "string",
    "date": "date"
  }
  ```
- **Response:**
  - **201 Created:** Returns booking confirmation.
  - **400 Bad Request:** Validation errors.

### Get Booking Details
- **Endpoint:** `/bookings/:id`
- **Method:** GET
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Response:**
  - **200 OK:** Returns booking details.
  - **404 Not Found:** Booking not found.

## Conclusion
This API specification outlines the endpoints available for the Travel Booking application. Each endpoint includes the method, URL, request parameters, and expected responses. For further details, please refer to the individual route and controller documentation.