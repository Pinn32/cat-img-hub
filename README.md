# Cat Img Hub

A Next.js web application for browsing, searching, and saving favorite cat images, powered by [The Cat API](https://thecatapi.com), MongoDB, and Google OAuth via Auth.js v5.

---

## Live Demo
**Click the link below to view live demo.**  
**https://cat-img-hub.vercel.app**

---

## Table of Contents

- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [API Routes](#api-routes)
- [MongoDB](#mongodb)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Team & Member Allocation](#team--member-allocation)

---

## Project Structure

```
cat-img-hub/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (NavBar, styled-components SSR)
│   ├── page.tsx                # Home page — random cat gallery
│   ├── api/
│   │   ├── auth/[...nextauth]/ # Auth.js catch-all route
│   │   ├── cats/random/        # GET /api/cats/random
│   │   ├── cats/search/        # GET /api/cats/search
│   │   └── favorites/          # GET / POST / DELETE /api/favorites
│   ├── favorites/page.tsx      # Favorites page (auth-gated)
│   ├── login/page.tsx          # Login page (Google OAuth)
│   └── search/page.tsx         # Search page (by cat ID)
│
├── components/                 # Reusable UI components
│   ├── CatCard.tsx             # Cat image card
│   ├── FavoritesContent.tsx    # Client island: favorites list
│   ├── HomeContent.tsx         # Client island: home gallery
│   ├── NavBar.tsx              # Top navigation bar
│   ├── SearchContent.tsx       # Client island: search UI
│   └── SignOutButton.tsx       # Server action logout button
│
├── lib/                        # Shared utilities & services
│   ├── cat-api.ts              # The Cat API wrapper
│   ├── favorites.ts            # MongoDB CRUD for favorites
│   ├── mongodb.ts              # MongoDB client connection
│   ├── types.ts                # Shared TypeScript types
│   └── useFavorites.ts         # Custom hook for like/unlike
│
├── types/
│   └── next-auth.d.ts          # NextAuth session/JWT type augmentation
│
└── auth.ts                     # Auth.js v5 configuration (Google OAuth)
```

---

## Key Features

- **Random Cat Gallery** — Home page loads a grid of random cat images with breed info fetched server-side from The Cat API.
- **Search by ID** — Users can look up any cat image by its Cat API image ID.
- **Favorites** — Authenticated users can like/unlike cats; favorites are persisted to MongoDB and shown on a dedicated page.
- **Google OAuth Login** — One-click sign-in via Google; no passwords stored.
- **Server Components + Client Islands** — Pages are Next.js async Server Components that pass initial data to interactive client components, minimizing client-side JavaScript.
- **Styled Components** — Consistent warm brown/orange (`#7a4b2a` / `#fff6e6`) design system with SSR style injection.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Auth | Auth.js v5 (next-auth beta) + Google OAuth |
| Database | MongoDB 6 (raw driver, no Mongoose) |
| Styling | styled-components 6 |
| External API | [The Cat API](https://thecatapi.com) |

---

## API Routes

### `GET /api/cats/random?limit=N`

Returns N random cats (default 6) from The Cat API. Each cat includes breed info; if The Cat API omits it, the route re-fetches the image individually to fill it in.

**Response:**
```json
{ "cats": [ { "id": "...", "imageUrl": "...", "breed": "...", "lifeSpan": "...", "temperament": "..." } ] }
```

---

### `GET /api/cats/search?id=<catId>`

Fetches a single cat by its Cat API image ID.

**Response:** `{ "cat": CatCardData }` or `{ "cat": null }` with status `404`.

---

### `GET /api/favorites`

Returns the logged-in user's saved favorites from MongoDB. Requires an active session; returns `401` otherwise.

**Response:** `{ "favorites": CatCardData[] }`

---

### `POST /api/favorites`

Adds a cat to the logged-in user's favorites. Deduplicates — adding the same cat twice is a no-op.

**Body:** `CatCardData` (JSON)

---

### `DELETE /api/favorites?id=<catId>`

Removes the cat with `id` from the logged-in user's favorites.

---

## MongoDB

The project uses the **raw MongoDB Node.js driver** (`mongodb@6`) — no Mongoose, no ODM.

### Connection (`lib/mongodb.ts`)

- Reads `MONGODB_URI` from environment variables.
- In **development**, the `MongoClient` promise is cached on `globalThis._mongoClientPromise` to survive Next.js hot reloads without multiplying connections.
- In **production**, a fresh connection is created per process.
- Exports `getMongoDatabase()` — returns the connected `Db` instance for the database named in the URI.

### Collection: `favorites`

Documents follow the `FavoriteDocument` shape:

```ts
type FavoriteDocument = {
  id: string;          // Cat API image ID
  imageUrl: string;
  breed: string;
  lifeSpan: string;
  temperament: string;
  userId: string;      // Google provider account ID from the session
};
```

### Service Layer (`lib/favorites.ts`)

| Function | Description |
| --- | --- |
| `getFavoritesByUserId(userId)` | Returns all favorites for a user, sorted newest-first |
| `getFavoriteIdsByUserId(userId)` | Returns only the `id` strings (for highlighting liked cards) |
| `addFavorite(userId, cat)` | Inserts a new favorite; skips if already present |
| `removeFavorite(userId, catId)` | Deletes the matching document |

---

## Authentication

Authentication is handled by **Auth.js v5** (`next-auth@5.0.0-beta`) with **Google OAuth** as the sole provider.

### Configuration (`auth.ts`)

- Provider: `GoogleProvider` using `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.
- **JWT callback:** stores `account.providerAccountId` (Google's stable account ID) as `token.userId`.
- **Session callback:** exposes `token.userId` as `session.user.id` so every server component and API route can identify the user without a separate database lookup.
- `trustHost: true` — required for flexible deployment environments.

### Route Handler (`app/api/auth/[...nextauth]/route.ts`)

Re-exports `GET` and `POST` from `auth.ts`'s `handlers` object — the standard Auth.js v5 App Router pattern.

### Login / Logout Flow

1. User visits `/login` and clicks **Continue with Google**.
2. A Next.js Server Action calls `signIn("google", { redirectTo: "/" })`.
3. Auth.js completes the OAuth cycle via `/api/auth/[...]` and sets a signed JWT cookie.
4. `session.user.id` is available in all subsequent server components via `await auth()`.
5. Logout is triggered by the `SignOutButton` server-action form, which calls `signOut({ redirectTo: "/" })`.

### Type Safety (`types/next-auth.d.ts`)

Module augmentation extends the built-in NextAuth types:

```ts
// Session
interface User { id: string }

// JWT
interface JWT { userId?: string }
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Auth.js
AUTH_SECRET=<random secret string>
AUTH_GOOGLE_ID=<Google OAuth client ID>
AUTH_GOOGLE_SECRET=<Google OAuth client secret>

# MongoDB
MONGODB_URI=<MongoDB connection string including database name>

# The Cat API (optional — works without it at lower rate limits)
THE_CAT_API_KEY=<your Cat API key>
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Team & Member Allocation

| Member | Responsibilities |
| --- | --- |
| **Aiqi Xu** | Authentication system (Auth.js v5 + Google OAuth), session/JWT type augmentation, NavBar, login page, sign-out button, global layout, styled-components SSR registry, global CSS |
| **Yuchen Bao** | The Cat API integration, random cat and search API routes, home page, search page, `CatCard` component and styles |
| **Tianpeng Xu** | MongoDB connection and client setup, favorites CRUD service layer, favorites API route, favorites page, `useFavorites` hook, shared TypeScript types |

### File Ownership Detail

**Aiqi Xu**
- `auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `app/layout.tsx`
- `app/login/page.tsx`, `app/login/login-card.styles.ts`
- `app/globals.css`
- `components/NavBar.tsx`, `components/NavBar.styles.ts`
- `components/Main.styles.ts`
- `components/SignOutButton.tsx`
- `lib/StyledComponentsRegistry.tsx`
- `types/next-auth.d.ts`

**Yuchen Bao**
- `lib/cat-api.ts`
- `lib/types.ts` — `CatCardData` type
- `app/api/cats/random/route.ts`
- `app/api/cats/search/route.ts`
- `app/page.tsx`
- `app/search/page.tsx`
- `components/CatCard.tsx`, `components/CatCard.styles.ts`
- `components/HomeContent.tsx`
- `components/SearchContent.tsx`

**Tianpeng Xu**
- `lib/mongodb.ts`
- `lib/favorites.ts`
- `lib/types.ts` — `FavoriteDocument` type
- `lib/useFavorites.ts`
- `lib/favorite-error-message.ts`
- `app/api/favorites/route.ts`
- `app/favorites/page.tsx`
- `components/FavoritesContent.tsx`
