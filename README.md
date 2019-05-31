# Mock AirBnb Booking System

The Mock AirBnb Booking System was designed to address whether or not users would be more likely to make a reservation for a listing on AirBnb if the host was a super host.
The search microservice provides users with popular listings, which are cached, or listings based on the criteria a user is browsing.
The booking microservice serves reserved dates for a specific listing so that clients can reserve available dates for a listing. When a reservation is made the booking service logs the reservation. Then the events microservice is provided with the listing id, booking id, and booking timestamp so that event analytics can be performed by the events microservice to formulate an answer for the business question. The booking microservice also provides the inventory microservice with booking timestamp, and listing id since the inventory microservice is the main store for all data including whether a listing is associated with a super host.

## Booking Microservice Architecture

View the booking microservice design [here](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0e/797629/382e2f362d17260ee35c9e012bd03f97-original.png)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Tasks](#tasks)

## Usage

> Some usage instructions

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Other Information
