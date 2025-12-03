# React + Vite
# CineScout — Discover Trending Movies

A modern React app to browse trending and popular movies from TMDB with a clean UI, fast search, and responsive design. Built with Vite for a snappy developer experience. Appwrite integration is optional and can be added later (current build focuses on TMDB-only client flow).

## Live Demo
- Hosted at: https://gentritflix.netlify.app/

## Highlights
- **Fast**: Vite + React for instant reloads and optimized builds.
- **Fresh Data**: Fetches live movie lists from TMDB (`discover` API).
- **Clean UI**: Minimal, accessible components and gradient accents.
- **Responsive**: Works great on mobile and desktop.
- **Extensible**: Designed to plug in Appwrite Tables later (favorites, profiles).

## Tech Stack
- `React 19`
- `Vite`
- `Tailwind-like utility classes` (project styles in `src/App.css`/`index.css`)
- `TMDB API` (client-side)

## Project Structure
```
my-first-react-app/
	public/
	src/
		assets/
		components/
			MovieCard.jsx
			Search.jsx
			Spinner.jsx
		App.css
		App.jsx
		index.css
		main.jsx
		appwrite.js   # optional, not used in current build
```

## Prerequisites
- Node.js 18+ and npm
- A TMDB v4 Read Access Token (JWT) for Bearer auth

## Environment Setup
Create a `.env.local` file in the project root with your TMDB token:
```
VITE_TMDB_API_KEY=YOUR_V4_READ_ACCESS_TOKEN
```
Notes:
- Vite only exposes variables prefixed with `VITE_`.
- If you only have a v3 API key, switch the fetch to use `api_key` query param instead of the `Authorization` header.


## Build & Preview
```powershell
npm run build
npm run preview
```

## Configuration Details
- TMDB requests are assembled in `src/App.jsx` using `import.meta.env.VITE_TMDB_API_KEY`.
- Loading and error states are handled gracefully; when the API succeeds, movie titles render under “All movies”.
- Ensure your browser/network allows outbound calls to `api.themoviedb.org`.

## Optional: Appwrite (Cloud 2025)
Appwrite Tables can power user features (favorites, lists, profiles). In Cloud 2025, Collections are replaced by Tables.
- Old: `databases.createDocument(databaseId, collectionId, payload)`
- New: `tables.createRecord(tableId, payload)`
This project doesn’t call Appwrite yet; you can add it later via `src/appwrite.js`.

## Deployment
Deploy as a static site (Netlify, Vercel, GitHub Pages, Azure Static Web Apps, etc.). Remember to set `VITE_TMDB_API_KEY` in the hosting environment.

Live site: https://gentritflix.netlify.app/

## Roadmap
- Movie cards with posters, ratings, and details
- Search and filters (genre, year, region)
- Favorites and user lists (via Appwrite Tables)
- Dark mode and accessibility polishing

## License
This project is for learning and portfolio use. No license specified.

## Credits
- Data: The Movie Database (TMDB)
- Build tooling: Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

