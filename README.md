# Bookmarks Web

Frontend for the [bookmarks-api](https://github.com/billy-miranda/bookmark-api): a simple app to manage bookmarks/links. Built with **Vite** and **React**.

## Features

- Register and log in (JWT)
- List, add, edit, and delete bookmarks
- Filter by tag and search by title/URL

## Prerequisites

- The [bookmarks-api](https://github.com/billy-miranda/bookmark-api) must be running (e.g. `http://localhost:3000`).

## Setup

```bash
npm install
cp .env.example .env
# Edit .env if your API runs on a different URL
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Register or log in, then manage your bookmarks.

## Environment

| Variable       | Description                   | Default                 |
| -------------- | ----------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the bookmarks API | `http://localhost:3000` |

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Author

**Billy John Miranda**

## License

MIT
