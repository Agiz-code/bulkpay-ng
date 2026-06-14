# Neon PostgreSQL Setup Guide

## Status

✅ **Neon DB is now the preferred database backend.**

The backend should use `apps/backend/.env` to store your Neon `DATABASE_URL`.

## Prerequisites

- A Neon PostgreSQL database instance
- Backend project with Prisma ORM configured
- Node.js and npm/yarn

## Quick Start

### 1. Create a Neon Database

1. Sign in to Neon: https://neon.tech
2. Create a new project and database
3. Copy the PostgreSQL connection string

### 2. Configure `apps/backend/.env`

Update `apps/backend/.env` with your Neon connection string:

```env
DATABASE_URL="postgresql://<username>:<password>@<project>.db.neon.tech/<database>?schema=public"
```

If you use Neon Auth or a project-specific auth endpoint, set `NEON_AUTH_URL` as needed.

### 3. Install Dependencies and Run Migrations

From the `apps/backend/` directory:

```bash
npm install
npx prisma migrate deploy
```

If you only need the Prisma client:

```bash
npx prisma generate
```

### 4. Start the Backend

```bash
npm run start:dev
```

## Backend API

- **API URL:** http://localhost:3000
- Use `apps/mobile/.env.example` or your own `.env` to configure `EXPO_PUBLIC_BACKEND_URL`

## Mobile App Configuration

The mobile app connects to the backend with `EXPO_PUBLIC_BACKEND_URL`.

- **Local dev:** `http://localhost:3000`
- **Physical device:** `http://<your-machine-ip>:3000`
- **Android emulator:** `http://10.0.2.2:3000`

## Notes

- Docker is no longer required for local DB setup.
- Ensure `apps/backend/.env` contains a valid Neon `DATABASE_URL`.
- If you hit connection errors, verify the Neon DB credentials and allowed network access.
