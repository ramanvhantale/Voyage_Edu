# VoyageEdu - OpenStreetMap Integration Setup Guide

This guide will help you set up and run the VoyageEdu project with OpenStreetMap (Leaflet.js) integration.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (already configured)

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Ensure MongoDB data is loaded:**
   - Run the migration script to load Excel data into MongoDB Atlas:
   ```bash
   node geocodeAndMigrate.js
   ```
   - This will read the Excel file from `backend/data/` and insert institutions into MongoDB Atlas.

4. **Start the backend server:**
   ```bash
   npm start
   # OR for development with auto-reload:
   npm run dev
   ```
   
   The backend will run on `http://localhost:3001`

5. **Verify backend is running:**
   - Visit `http://localhost:3001/health` - should return `{"status":"OK",...}`
   - Visit `http://localhost:3001/api/institutions` - should return JSON array of institutions

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API URL (optional):**
   - Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
   - If not set, it defaults to `http://localhost:3001`

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:8080`

## Features Implemented

### ✅ Backend API
- **GET `/api/institutions`** - Returns all institutions with coordinates
- **GET `/api/institutions/:id`** - Returns a single institution by ID
- CORS enabled for frontend communication
- MongoDB Atlas integration

### ✅ Frontend Components

1. **LeafletMap Component** (`/map` page)
   - Full interactive map with all institutions
   - Marker clustering for better performance
   - Popups on hover and click
   - Responsive design

2. **MiniMap Component** (Homepage)
   - Shows 5 random institutions
   - Scroll zoom disabled
   - Compact 350px height
   - Links to full map page

### ✅ Map Features
- OpenStreetMap tiles
- Blue marker icons
- Hover popups with institution details
- Click popups with "View Details" button
- Automatic bounds fitting
- Error handling for missing coordinates

## Project Structure

```
backend/
├── src/
│   ├── models/
│   │   └── Institution.js          # Mongoose model
│   ├── controllers/
│   │   └── institutionController.js # API controllers
│   ├── routes/
│   │   └── institutionRoutes.js    # Express routes
│   └── server.js                   # Express server
├── data/
│   └── Copy of University-ALL UNIVERSITIES(1).xlsx
├── geocodeAndMigrate.js            # Data migration script
└── package.json

frontend/
├── src/
│   ├── components/
│   │   ├── LeafletMap.tsx          # Full map component
│   │   └── MiniMap.tsx             # Homepage mini map
│   ├── services/
│   │   └── institutionService.ts   # API service
│   ├── hooks/
│   │   └── useLeaflet.ts           # Leaflet loading hook
│   ├── types/
│   │   └── leaflet.d.ts            # TypeScript declarations
│   └── pages/
│       ├── Map.tsx                  # Full map page
│       └── Index.tsx               # Homepage
├── index.html                       # Includes Leaflet CDN
└── package.json
```

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error:**
   - Verify your MongoDB Atlas connection string in `backend/src/server.js`
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check network connectivity

2. **No Data in Database:**
   - Run `node geocodeAndMigrate.js` to populate data
   - Verify institutions have valid latitude/longitude values

### Frontend Issues

1. **Map Not Loading:**
   - Check browser console for errors
   - Verify Leaflet CDN is loading (check Network tab)
   - Ensure backend is running and accessible

2. **API Errors:**
   - Verify backend is running on port 3001
   - Check CORS settings in `backend/src/server.js`
   - Verify `VITE_API_URL` environment variable

3. **No Markers Showing:**
   - Check browser console for API errors
   - Verify institutions have valid coordinates
   - Check Network tab to see if `/api/institutions` returns data

## Production Deployment

1. **Backend:**
   - Set `MONGO_URI` environment variable
   - Set `PORT` environment variable
   - Use `npm start` to run production server

2. **Frontend:**
   - Set `VITE_API_URL` to your production backend URL
   - Run `npm run build` to create production build
   - Deploy the `dist` folder to your hosting service

## Notes

- Leaflet.js is loaded via CDN in `index.html`
- Marker clustering uses Leaflet.markercluster plugin
- Institutions without coordinates are automatically filtered out
- The system logs warnings for institutions missing coordinates

