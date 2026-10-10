# Starting the project

## Prerequisites

- Node.js and npm.
- MySQL Server and MySQL Workbench (or another MySQL client).
- A terminal opened in the combined project folder.

The frontend and backend have separate `package.json` files. Install dependencies
in each folder; installing from the parent folder does not install either
application's dependencies.

## 1. Prepare the database

1. Start your local MySQL Server.
2. Open `backend/db.sql` in MySQL Workbench and execute it. It creates
   the `3webshop` schema and its tables.
3. If you need the sample records, review and execute
   `backend/seed.sql` after creating the schema.

The current connection in `backend/src/util/database.ts` uses MySQL
on `localhost`, user `root`, and schema `3webshop`. Its password is read from
`DB_PASSWORD` in the backend's `.env` file. The backend also reads an optional
`PORT`; it defaults to `4001`.

## 2. Install and start the backend

In a PowerShell terminal from the combined project folder:

```powershell
Set-Location .\backend
npm install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Set `DB_PASSWORD` in `backend/.env` to the password for your local
MySQL `root` user. Keep this local file private and do not put credentials in
documentation or source control.

Start the backend:

```powershell
npm run start
```

The development script runs the TypeScript server with automatic restarts when
backend source files change. By default, the API is available at
`http://localhost:4001`. To compile the backend once instead, run `npm run build`.

## 3. Install, build, and serve the frontend

Open a second terminal in the combined project folder:

```powershell
Set-Location .\frontend
npm install
npm run build
npm run server
```

The TypeScript build writes JavaScript into `frontend/public/js`.
The static server serves the `public` folder, normally at
`http://localhost:8080`. Open `http://localhost:8080` in your browser.

For frontend development, use `npm run start` instead of `npm run build` to keep
the TypeScript compiler watching for changes. Keep `npm run server` running in
another frontend terminal so the browser can load the static files.

## 4. Check that the applications can communicate

The backend allows browser requests from local origins on ports `8080` and `5500`.
The frontend API services currently use `http://localhost:4001`; keep the backend
on that port unless you also update the frontend API URLs.

For example, the backend exposes `GET http://localhost:4001/` as a basic
server response. Product data is available at
`GET http://localhost:4001/api/products`.

## Common problems

- **Database connection fails:** confirm MySQL is running, the `3webshop` schema
  exists, and `DB_PASSWORD` in the backend `.env` matches your local MySQL
  password.
- **The API cannot be reached:** check that the backend is running on port
  `4001`.
- **The browser blocks an API request:** serve the frontend from an allowed
  local origin (`localhost:8080`, `127.0.0.1:8080`, `localhost:5500`, or
  `127.0.0.1:5500`) and check the browser console.
- **Frontend changes do not appear:** run the TypeScript watcher or rebuild, then
  reload the page.
- **Login page does not call the API:** there are currently two frontend wiring
  mismatches. `public/login.html` refers to `login.js` in the `public` root, but
  TypeScript writes `login.js` under `public/js`. Also, `src/login.ts` looks for a
  button with class `blue`, while the login button in the HTML has class `btn`.
  Align these before expecting the login page to submit to the API.
