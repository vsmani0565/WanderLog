# WanderLog

WanderLog is a React + Vite travel bucket list app built with plain CSS, React Router, the REST Countries API, and Reqres.in mock auth.

## Run locally

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Build for production: `npm run build`
4. Preview the build: `npm run preview`

## Demo credentials

Use `eve.holt@reqres.in` with any password for the successful Reqres mock auth flow.

## Notes

- Authentication, route protection, and session persistence are handled in localStorage.
- Bucket list and visited countries are persisted per signed-in user.
- The app handles Reqres and REST Countries loading and error states.
- With more time, I would add drag-to-reorder for the bucket list, map previews, and richer country comparisons.
