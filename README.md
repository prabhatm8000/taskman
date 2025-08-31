# Taskman

> A clean, type-safe **task management** monorepo with a **client** (React + TypeScript) and a **server** (Node.js + Express + MongoDB).

<video width="100%" height="auto" controls autoplay muted>
    <source src="https://res.cloudinary.com/dtapvbbzb/video/upload/v1756639175/portfolio/taskman-video-1756638341949_zfthzk.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

---

## Table of Contents

-   [About](#about)
-   [Tech Stack](#tech-stack)
-   [Monorepo Structure](#monorepo-structure)
-   [Getting Started](#getting-started)

    -   [Prerequisites](#prerequisites)
    -   [Clone & Install](#clone--install)
    -   [Environment Variables](#environment-variables)
    -   [Run in Development](#run-in-development)
    -   [Build & Production](#build--production)

-   [Project Scripts](#project-scripts)
-   [API (Server)](#api-server)
-   [UI (Client)](#ui-client)
-   [Project Structure](#project-structure)

---

## About

**Taskman** is a task management application designed to help users manage tasks effectively. The repository is organized as a monorepo with two workspaces:

-   `client/` — the front‑end (React + TypeScript + React Router + Zustand + TailwindCSS)
-   `server/` — the back‑end (Node.js + Express + TypeScript + MongoDB)

### Key Features

-   Create, read, update, and delete tasks
-   Status
-   Authentication (JWT)
-   Persistent storage via MongoDB

---

## Tech Stack

-   **Languages:** TypeScript
-   **Frontend:** React, React Router, Zustand, TailwindCSS
-   **Backend:** Node.js, Express, MongoDB
-   **Tooling:** ESLint, Prettier, tsconfig paths, dotenv for environment variables

---

## Monorepo Structure

```
root
├─ client/                # Frontend app (React + TypeScript)
│  ├─ src/
│  ├─ public/
│  ├─ index.html
│  └─ package.json
├─ server/                # Backend service (Node.js + Express + MongoDB)
│  ├─ src/
│  ├─ models/
│  ├─ routes/
│  └─ package.json
├─ package.json           # root scripts
├─ .gitignore
└─ README.md
```

---

## Getting Started

### Prerequisites

-   **Node.js** ≥ 18.x (LTS recommended)
-   **npm** or **pnpm**
-   **MongoDB** instance (local or Atlas)

### Clone & Install

```bash
# clone
git clone https://github.com/prabhatm8000/taskman
cd taskman

# install dependencies for both workspaces
cd client && npm i && cd ../server && npm i && cd ..
```

### Environment Variables

Create `.env` files in the workspaces that need them.

**server/.env**

```
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskman
JWT_SECRET=your_secret_key
```

### Run in Development

Use separate terminals:

```bash
# Terminal 1 – server
cd server
npm run dev

# Terminal 2 – client
cd client
npm run dev
```

By default you’ll get:

-   Client at `http://localhost:5173`
-   Server at `http://localhost:8080`

### Build & Production

```bash
# server
cd server
npm run build
npm start

# client
cd client
npm run build
npm run preview
```

---

## Project Scripts

**server/package.json (example)**

```json
{
    "scripts": {
        "dev": "nodemon --watch src --exec ts-node src/index.ts",
        "build": "tsc -p tsconfig.json",
        "start": "node dist/index.js",
        "lint": "eslint .",
        "typecheck": "tsc --noEmit"
    }
}
```

**client/package.json (example)**

```json
{
    "scripts": {
        "dev": "vite",
        "build": "tsc -b && vite build",
        "preview": "vite preview",
        "lint": "eslint .",
        "typecheck": "tsc --noEmit"
    }
}
```

---

## API (Server)

### Tasks

-   `GET /api/tasks` – list tasks (query: `status`, `priority`, `search`)
-   `POST /api/tasks` – create task `{ title, description?, status?, priority? }`
-   `GET /api/tasks/:id` – get task by id
-   `PATCH /api/tasks/:id` – update fields
-   `DELETE /api/tasks/:id` – delete

### Auth

-   `POST /api/user/register`
-   `POST /api/user/login`
-   `GET /api/user` (requires auth)

---

## UI (Client)

-   React Router for navigation
-   Zustand for state management
-   TailwindCSS for styling
-   Task list
-   Task details & edit
-   Responsive design

---

## Project Structure

```
client/
  src/
    components/
    pages/
    store/
    styles/
  tsconfig.json
  package.json

server/
  src/
    routes/
    controllers/
    services/
    models/
    middlewares/
    utils/
  tsconfig.json
  package.json
```
