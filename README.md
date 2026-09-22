# Next Dashboard

A responsive user-management dashboard built with **Next.js, TypeScript, and Tailwind CSS**. It includes mock authentication, dashboard analytics, an interactive users table, and browser-based Excel/PDF exports.

> **Note:** This project uses mock data and client-side authentication for assignment purposes. No real backend or database is connected.

## Features

* Login, signup, and logout flows
* Client-side protected dashboard route
* Mock authentication with `localStorage`
* Dashboard statistics:

  * Total Users
  * Active Users
  * Inactive Users
  * Average Age
* Interactive charts using Recharts
* Users table with:

  * Search by name/email
  * Filter by role, status, and country
  * Sort by name, age, and creation date
* Export filtered users to:

  * Excel (`.xlsx`)
  * PDF (`.pdf`)
* Responsive desktop/mobile navigation
* Loading, error, empty, and no-results states
* Form validation using React Hook Form + Zod

## User Flow

1. `/` redirects based on authentication state.
2. Unauthenticated users are redirected to `/login`.
3. Users can log in or create a mock account through `/signup`.
4. Successful authentication redirects to `/dashboard`.
5. Users can explore analytics and interact with the users table.
6. Logout clears the mock session and redirects to `/login`.

## Project Structure

```text
app/
├── page.tsx
├── login/page.tsx
├── signup/page.tsx
├── dashboard/page.tsx
└── layout.tsx

components/
├── providers/
└── ui/

features/
├── authentication/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── schemas/
│   └── services/
│
└── dashboard/
    ├── components/
    ├── data/
    ├── hooks/
    ├── services/
    ├── types/
    └── utils/

hooks/
store/
lib/
public/
```

The project follows a **feature-oriented architecture**, keeping authentication and dashboard logic organized into their own components, hooks, services, types, and utilities.

## Tech Stack

* **Next.js 16.3.5** — App Router
* **React 19.2.8**
* **TypeScript**
* **Tailwind CSS 4**
* **React Hook Form + Zod** — Forms & validation
* **Redux Toolkit** — Shared state
* **Recharts** — Data visualization
* **Lucide React** — Icons
* **xlsx** — Excel export
* **jsPDF + AutoTable** — PDF export
* **Docker / Docker Compose** — Containerization

## Getting Started

### Requirements

* Node.js 20+
* npm

No environment variables are required.

### Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Production

```bash
npm run build
npm run start
```

### Docker

```bash
docker compose up --build
```

The application will be available at `http://localhost:3000`.

To stop the container:

```bash
docker compose down
```

## Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Mock Data & Authentication

Authentication and dashboard data are intentionally mocked.

* Initial users: `features/authentication/data/mockUsers.ts`
* Dashboard data: `features/dashboard/data/mockDashboardData.ts`
* Mock accounts are persisted in `localStorage`
* Active session is stored as `mock-auth-user`

Only the authenticated user's basic information is stored in the active session; passwords are not stored there.

## Export

Exports use the **currently displayed table data**, meaning search, filters, and sorting are applied before export.

Supported formats:

* **Excel:** `users.xlsx`
* **PDF:** `users.pdf`

All export processing happens in the browser; no data is sent to a server.

## Future Improvements

* Replace mock authentication with secure server-side authentication
* Connect to a real API and database
* Add server-side pagination/filtering/sorting
* Add automated tests
* Introduce role-based permissions
