![Logo](https://github.com/OmerMushkatel/JaMoveo/blob/main/general/logo.png?raw=true)

## Description

Welcome to JaMoveo — a web application designed to bring the Moveo band’s rehearsal sessions to the next level!
This app allows band members to log in from their phones, select their instruments, and follow along with songs during rehearsals. An admin user can manage rehearsal sessions, select songs, and control what everyone sees in real-time.

## User Access Information

- You can create regular user via: https://jamoveo-rust.vercel.app/register
- You can create admin user via: https://jamoveo-rust.vercel.app/registerAdmin
- You can login via: https://jamoveo-rust.vercel.app/login

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

## Local setup

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

## Project Structure
JaMoveo/
│
├── backend/                   # NestJS backend app
│   ├── src/
│   │   ├── auth/              # Authentication logic (JWT, guards, strategy)
│   │   ├── enums/             # Shared enums (e.g., instruments)
│   │   ├── gateway/           # WebSocket gateway (real-time sync)
│   │   ├── songs/             # Song management (search, schema, controller)
│   │   ├── users/             # User handling (schema, service, controller)
│   │   └── main.ts            # App bootstrap
│   ├── Dockerfile.dev         # Dockerfile for backend service
│   └── ...                    # Configs, tests, and shared utils
│
├── frontend/                  # React (Vite + TS) frontend app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   └── Logos/         # Logo components (Header, Black, White)
│   │   ├── pages/             # App views (Login, Register, Main, 404)
│   │   ├── types/             # TypeScript interfaces and models
│   │   ├── assets/            # Static images and assets
│   │   ├── socket.ts          # WebSocket client connection
│   │   └── main.tsx           # React entry point
│   ├── public/                # Public static files
│   ├── vite.config.ts         # Vite configuration
│   └── Dockerfile.dev         # (optional) Dev Dockerfile
│
├── database/                  # MongoDB container config
│   ├── .env.example           # Example DB environment variables
│   └── Dockerfile.dev         # Dockerfile for MongoDB (if applicable)
│
├── general/                   # General assets and branding
│   └── logo.png               # App logo
│
├── docker-compose.yml         # Docker Compose orchestration
├── architecture.drawio        # System architecture diagram
├── README.md                  # You're here 📄
└── .gitignore                 # Git ignored files


## Technologies Used

- NestJS
- Docker
- React
- MongoDB
- Vercel Deployment
