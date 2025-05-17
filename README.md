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
├── backend/ # NestJS backend
│ ├── src/
│ │ ├── auth/ # Auth module (JWT, guards, strategies)
│ │ ├── enums/ # Shared enums (e.g., instruments)
│ │ ├── gateway/ # WebSocket gateway
│ │ ├── songs/ # Songs module (schema, service, controller)
│ │ ├── users/ # Users module (schema, service, controller)
│ │ ├── app.module.ts # Root module
│ │ ├── main.ts # App bootstrap
│ │ └── app.controller.ts # Root controller
│ ├── Dockerfile.dev # Dev Dockerfile
│ └── ... # Tests, configs, etc.
│
├── frontend/ # Vite + React frontend
│ ├── src/
│ │ ├── components/ # Shared UI components
│ │ │ └── Logos/ # Logo variants
│ │ ├── pages/ # Main pages (Login, Register, etc.)
│ │ ├── types/ # TypeScript interfaces
│ │ ├── assets/ # Static assets
│ │ ├── socket.ts # Socket.IO client
│ │ └── main.tsx # React entry point
│ ├── public/ # Static public files
│ ├── vite.config.ts # Vite config
│ ├── package.json # Frontend dependencies
│ └── Dockerfile.dev # (Optional) Dev Dockerfile
│
├── database/ # MongoDB container
│ ├── .env.example # Example DB environment
│ └── Dockerfile.dev # Dev Dockerfile for MongoDB
│
├── general/ # Shared brand assets
│ └── logo.png # App logo
│
├── docker-compose.yml # Service orchestration
├── architecture.drawio # System architecture diagram
├── README.md # Project documentation
└── .gitignore # Git ignored files

<!-- TREEVIEW START -->

├── example-directory/
│ ├── build/
│ ├── scripts/
│ ├── src/
│ │ ├── backend/
│ │ │ └── server/
│ │ └── frontend/
│ │ ├── js/
│ │ └── styles/
│ └── tests/

<!-- TREEVIEW END -->

## Technologies Used

- NestJS
- Docker
- React
- MongoDB
- Vercel Deployment
