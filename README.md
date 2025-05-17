# JaMoveo

![Logo](https://github.com/OmerMushkatel/JaMoveo/blob/main/general/logo.png?raw=true)

## Description

Welcome to JaMoveo — a web application designed to bring the Moveo band’s rehearsal sessions to the next level!
This app allows band members to log in from their phones, select their instruments, and follow along with songs during rehearsals. An admin user can manage rehearsal sessions, select songs, and control what everyone sees in real-time.

## User Access Information

You can create regular user via: https://jamoveo-rust.vercel.app/register
You can create admin user via: https://jamoveo-rust.vercel.app/registerAdmin
You can login via: https://jamoveo-rust.vercel.app/login

## Pre-Created Users for Your Use

| Username        | Password | Role  |
| --------------- | -------- | ----- |
| guitar_user     | 123456   | User  |
| bass_user       | 123456   | User  |
| vocals_user     | 123456   | User  |
| keyboards_admin | 123456   | Admin |

_Note: A few users have already been created for you. Use the above password to log in._

## Installation

```bash
# Clone the repository
git clone git@github.com:OmerMushkatel/JaMoveo.git

# Navigate to the project directory
cd JaMoveo
```

## Usage

```bash
# Define .env in database
# Define .env in backend
# Define .env in frontend

# Run the backend + database
docker compose up --build

# Run the frontend
cd frontend
npm install
npm run dev -- --host
```

## Technologies Used

- NestJS
- Docker
- React
- MongoDB
- Vercel Deployment
