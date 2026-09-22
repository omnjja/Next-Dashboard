# Next Dashboard

A responsive user-management dashboard built with **Next.js, TypeScript, and Tailwind CSS**. The application combines a client-side mock authentication flow with dashboard analytics, interactive user data exploration, and browser-based Excel and PDF exports.

## Project Overview

The dashboard provides a fixed mock dataset of users with summary statistics, visual analytics, and an interactive users table.

Users can:

* Sign up or log in through the mock authentication flow.
* Explore dashboard metrics and charts.
* Search, filter, and sort users.
* Export the currently displayed users to Excel or PDF.
* Access the dashboard through a responsive desktop and mobile interface.

The project does not connect to a real backend or database. Authentication and dashboard data are intentionally mocked for the purpose of this assignment.

## Features

* Login, signup, and logout flows.
* Client-side protected dashboard route.
* Mock authentication with `localStorage` persistence.
* Dashboard summary cards for:

  * Total Users
  * Active Users
  * Inactive Users
  * Average Age
* Recharts visualizations for:

  * Users by Role
  * Users by Status
  * Users Created Over Time
  * Users by Country
* Interactive users table with:

  * Search by name or email
  * Role, status, and country filters
  * Sorting by Name, Age, and Created At
* Excel (`.xlsx`) and PDF (`.pdf`) exports.
* Responsive desktop and mobile navigation.
* Responsive dashboard cards and charts.
* Horizontally scrollable users table on smaller screens.
* Field-level and submission-level form validation.
* Loading, error, empty, and no-matching-users states.

## User Flow

1. The user enters the application through `/`.
2. Authenticated users are redirected to `/dashboard`.
3. Unauthenticated users are redirected to `/login`.
4. Users can either log in with an existing mock account or create a new account through `/signup`.
5. After successful authentication, the user is redirected to the dashboard.
6. From the dashboard, users can explore analytics and interact with the users table.
7. The table can be searched, filtered, sorted, and exported.
8. Logging out removes the active mock session and redirects the user to `/login`.

## Authentication Flow

Authentication is intentionally mock-only.

Initial accounts are defined in:

```text
features/authentication/data/mockUsers.ts
```

The authentication service uses browser `localStorage` to persist mock accounts under:

```text
mock-auth-users
```

When a user signs up, the new account is added to the stored mock users. During login, the provided credentials are checked against the stored accounts.

Only the authenticated user's `id`, `name`, and `email` are stored as the active session under:

```text
mock-auth-user
```

The password is not stored in the active session object.

Redux initializes the authentication state from the stored session. Successful login and signup dispatch the authentication action and redirect the user to `/dashboard`. Logout clears the active session and redirects to `/login`.

The dashboard uses a client-side authentication guard to redirect unauthenticated users. This is an assignment-level client-side implementation and is not intended to represent production-grade authentication or session management.

## Dashboard

After authentication, the dashboard loads its data through a Redux Toolkit async thunk and the dashboard service.

The current service returns the static dataset from:

```text
features/dashboard/data/mockDashboardData.ts
```

The dashboard consists of:

* **Responsive Sidebar**

  * Analytics navigation
  * Users navigation
  * Current user information
  * Logout action

* **Summary Cards**

  * Total Users
  * Active Users
  * Inactive Users
  * Average Age

* **Analytics Charts**

  * Users by Role
  * Users by Status
  * Users Created Over Time
  * Users by Country

* **Users Table**

  * Search
  * Filters
  * Sorting
  * Export controls

Dashboard statistics and chart datasets are derived from the full fetched users dataset. Table search, filtering, and sorting affect only the displayed table rows and export input.

## UI & Responsive Design

The interface is designed to adapt across desktop and mobile screen sizes.

* Desktop screens use a persistent sidebar.
* Smaller screens use a mobile navigation button and slide-out sidebar.
* Summary cards use a responsive grid layout.
* Chart panels adapt their layout based on available screen width.
* The users table is horizontally scrollable on narrow screens.
* Loading skeletons provide feedback while dashboard data is being loaded.
* Dedicated error and empty states handle unavailable or empty dashboard data.
* A separate no-matching-users state is displayed when table filters return no results.

## Users Table

The table displays:

| Field      | Description            |
| ---------- | ---------------------- |
| Name       | User's name            |
| Email      | User's email address   |
| Role       | User role              |
| Status     | Active/inactive status |
| Country    | User's country         |
| Age        | User's age             |
| Created At | Account creation date  |

The source records also contain an internal `id`, which is used internally but is not displayed or exported.

### Search, Filtering & Sorting

* Search matches user name or email case-insensitively.
* Filters are available for role, status, and country.
* Each filter provides an `All` option.
* Name, Age, and Created At can be sorted in ascending or descending order.
* Name ascending is the initial sort order.
* Filtering and sorting are handled client-side through the `useDashboardTable` hook.
* The table controls display the number of matching users compared with the total dataset.
* When no users match the current search or filters, a dedicated empty state is displayed and the export control is disabled.

## Export Functionality

Exports are performed entirely in the browser using the users currently displayed in the table.

This means the active search, filters, and sorting are applied before generating the export.

The exported fields are:

| Field      | Source                                 |
| ---------- | -------------------------------------- |
| Name       | `name`                                 |
| Email      | `email`                                |
| Role       | `role`                                 |
| Status     | `status`                               |
| Country    | `country`                              |
| Age        | `age`                                  |
| Created At | `createdAt`, formatted as `YYYY-MM-DD` |

### Excel Export

Excel export is implemented with the [`xlsx`](https://www.npmjs.com/package/xlsx) package.

The export utility:

* Creates an XLSX workbook.
* Creates a `Users` worksheet.
* Maps the displayed users to the seven exported fields.
* Starts a client-side download as `users.xlsx`.

### PDF Export

PDF export is implemented with [`jsPDF`](https://www.npmjs.com/package/jspdf) and [`jspdf-autotable`](https://www.npmjs.com/package/jspdf-autotable).

The export utility:

* Creates a landscape PDF document.
* Generates a table containing the exported user data.
* Uses AutoTable for table layout and pagination.
* Starts a client-side download as `users.pdf`.

No export request is sent to a server.

## Architecture & Project Structure

The project uses the **Next.js App Router** for route entry points and a **feature-oriented architecture** for authentication and dashboard functionality.

Redux Toolkit is used for shared client-side state, while feature-specific hooks and utilities keep local behavior close to the feature that owns it.

```text
app/
├── page.tsx                  # Auth-aware root redirect
├── login/page.tsx            # Login route
├── signup/page.tsx           # Signup route
├── dashboard/page.tsx        # Protected dashboard route
└── layout.tsx                # Root layout and Redux provider

components/
├── providers/                # Redux provider
└── ui/                       # Reusable UI primitives

features/
├── authentication/
│   ├── components/           # Auth forms and shared auth UI
│   ├── data/                 # Initial mock auth users
│   ├── hooks/                # Shared auth submission behavior
│   ├── schemas/              # Zod validation schemas
│   └── services/             # localStorage-backed auth service
│
└── dashboard/
    ├── components/           # Dashboard, charts, cards, table, states
    ├── data/                 # Mock dashboard users
    ├── hooks/                # Table search/filter/sort behavior
    ├── services/             # Dashboard data access
    ├── utils/                # Statistics, charts, and export utilities
    └── types/                # Dashboard types

hooks/                        # Shared hooks
store/                        # Redux store and typed hooks
lib/                          # Shared utilities
public/                       # Static assets
```

## Tech Stack

| Technology              | Purpose                              |
| ----------------------- | ------------------------------------ |
| Next.js 16.3.5          | Application framework and App Router |
| React 19.2.8            | UI development                       |
| TypeScript              | Type-safe development                |
| Tailwind CSS 4          | Styling and responsive layouts       |
| React Hook Form         | Form state management                |
| Zod                     | Form validation                      |
| Redux Toolkit           | Authentication and dashboard state   |
| Recharts                | Dashboard data visualization         |
| Lucide React            | UI icons                             |
| xlsx                    | Excel workbook generation            |
| jsPDF                   | PDF document generation              |
| jspdf-autotable         | PDF table generation                 |
| Docker / Docker Compose | Production containerization          |

## Getting Started

### Prerequisites

* Node.js 20 or later
* npm

No environment variables are required by the current implementation.

### Install and Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The root route redirects to `/login` until a user is authenticated.

### Production Build

```bash
npm run build
npm run start
```

The project uses:

```ts
output: "standalone"
```

in `next.config.ts`, which produces the standalone server bundle used by the Docker image.

## Available Scripts

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Starts the Next.js development server. |
| `npm run build` | Creates the production Next.js build.  |
| `npm run start` | Starts the production server.          |
| `npm run lint`  | Runs ESLint.                           |

## Implementation Notes & Design Decisions

### Feature-Oriented Architecture

Authentication and dashboard functionality are organized into separate feature modules. This keeps related components, hooks, services, types, and utilities together and makes the project easier to maintain.

### Mock Service Boundaries

Authentication and dashboard data access are isolated behind services. This provides a clear boundary where real API calls could be introduced later without tightly coupling the UI components to the data source.

### Client-Side State

Redux Toolkit manages shared authentication and dashboard request state.

Table search, filtering, sorting, and other table-specific state remain local to `useDashboardTable` because that state belongs specifically to the users table.

### Reusable Authentication Components

Login and signup share reusable components and hooks including:

* `AuthLayout`
* `AuthFormField`
* `useAppForm`
* `useAuthSubmit`

Their differences are handled through separate Zod schemas and authentication service calls.

### Derived Dashboard Data

Dashboard statistics and chart datasets are derived from the fetched users array rather than being stored as duplicated state.

### Shared Export Mapping

Excel and PDF exports use the same seven-column data mapping and date formatting to keep exported data consistent across formats.

### Client-Side Trade-Off

Keeping authentication, filtering, sorting, and exports client-side makes the assignment self-contained and easy to run locally. For a production-scale application, these responsibilities would typically move toward server-backed data access, secure sessions, and server-side processing for large datasets.

## Future Improvements

* Replace mock services with a real authenticated API and database.
* Introduce secure session management instead of client-side `localStorage` authentication.
* Add server-side pagination, filtering, and sorting for larger datasets.
* Add automated tests for authentication, table transformations, and export functionality.
* Introduce role-based permissions if the application evolves into a multi-user production system.

## Docker

The project includes a multi-stage `Dockerfile` that:

1. Installs dependencies using `npm ci`.
2. Builds the Next.js standalone application.
3. Runs the generated standalone `server.js` with Node 20 Alpine.

The `.dockerignore` excludes dependencies, build output, version-control files, and local environment files from the Docker build context.

### Run with Docker Compose

```bash
docker compose up --build
```

The application is available at:

http://localhost:3000

To stop the container:

```bash
docker compose down
```

The Compose service runs with `NODE_ENV=production` and maps host port `3000` to container port `3000`.
