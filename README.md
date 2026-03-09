# LifeAssist AI

LifeAssist AI is a full-stack healthcare guidance app that provides informational support for symptoms, OTC medicine references, home remedies, emergency CPR flow, nearby medical locations, and daily health routines.

## Safety Notice

**This system provides informational guidance only and is not a substitute for professional medical advice.**

**Emergency cases: call emergency services immediately.**

## Tech Stack

- Frontend: Next.js (React) + TailwindCSS
- Backend: Node.js + Express
- AI: OpenAI API (with local fallback if key is missing)
- Database: MongoDB + Mongoose
- Maps: Google Places API (if key present), fallback OpenStreetMap/Overpass

## Project Structure

```text
LifeAssist-AI/
├── backend/
│   ├── src/
│   │   ├── config/                 # env and database bootstrap
│   │   ├── controllers/            # request handlers
│   │   ├── data/                   # knowledge base + emergency keywords + CPR steps
│   │   ├── middleware/             # error middleware
│   │   ├── models/                 # Mongo schemas
│   │   ├── prompts/                # AI prompt engineering logic
│   │   ├── routes/                 # API route registration
│   │   ├── services/               # AI, nearby map lookup, symptom/routine services
│   │   ├── utils/                  # helpers and DB seeding
│   │   ├── app.js
│   │   └── server.js
│   └── .env.example
├── frontend/
│   ├── public/cpr/                 # CPR illustration assets
│   ├── src/
│   │   ├── app/                    # App Router entry
│   │   ├── components/             # UI modules
│   │   ├── hooks/                  # voice emergency hook
│   │   └── lib/api.js              # frontend API client
│   └── .env.local.example
├── docker-compose.yml
└── README.md
```

## Backend API

Base URL: `http://localhost:5000/api/health`

- `POST /analyze`
  - Input: `{ "query": "I have fever and headache" }`
  - Output sections:
    - possibleCauses
    - homeRemedies
    - otcMedicines
    - whenToSeeDoctor
    - emergencyWarningSigns
  - Automatically flags emergency keywords (collapsed, not breathing, heart attack, unconscious, etc.)

- `GET /emergency/cpr`
  - Returns CPR step-by-step guide + rhythm range

- `GET /nearby?lat=<x>&lng=<y>`
  - Returns nearby clinics, hospitals, pharmacies, ambulance services
  - Includes distance, rating (if provider supports), and directions link

- `GET /knowledge-base`
  - Returns all structured home remedy records

- `POST /routine`
  - Input: `{ "requestText": "Create healthy routine" }`
  - Output: morning routine, exercise, hydration, sleep schedule, diet suggestions

## Prompt Engineering Logic

The health AI prompting lives in:
- `backend/src/prompts/healthPrompt.js`

Prompt constraints enforce:
- informational-only behavior
- no doctor impersonation
- OTC-only medicine references
- red-flag warning signs
- strict JSON output shape for stable UI rendering

## Database Schemas

- `Remedy` model (`backend/src/models/Remedy.js`)
  - condition, aliases, causes, remedies, OTC medicines (usage, dosage, warnings)
- `QueryLog` model (`backend/src/models/QueryLog.js`)
  - query, emergency flag, matched conditions, response source

## Features Implemented

1. Symptom Input with AI interpretation and structured response rendering
2. Emergency Mode with red UI and CPR instruction sequence
3. CPR rhythm timer for compression pacing
4. Nearby help map + list with directions
5. Home remedy knowledge base for fever, cold, headache, burn, minor injury, food poisoning, acidity, cough
6. OTC medicine guidance with safe dosage and warnings
7. Daily health routine generator
8. Voice mode trigger for emergency keywords
9. Safety disclaimer and emergency warning banners across the app

## Local Setup

### 1) Install dependencies

From `LifeAssist-AI`:

```bash
npm install
npm install -w backend
npm install -w frontend
```

### 2) Configure environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

Set `OPENAI_API_KEY` in `backend/.env`.

Optional:
- `GOOGLE_MAPS_API_KEY` for richer place ratings
- Without it, app uses OpenStreetMap fallback

### 3) Start MongoDB

Option A (local): run your MongoDB service on `27017`

Option B (Docker):

```bash
docker compose up -d mongodb
```

### 4) Seed knowledge base

```bash
npm run seed -w backend
```

### 5) Run the app

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Deployment Instructions

### Frontend (Vercel)

1. Import `frontend` directory as Vercel project
2. Set environment variable:
   - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>/api/health`
3. Deploy

### Backend (Render / Railway / Fly.io)

1. Deploy `backend` directory as Node service
2. Set environment variables from `backend/.env.example`
3. Attach MongoDB instance (Atlas or managed provider)
4. Run seed once:
   - `npm run seed`
5. Start command:
   - `npm start`

### MongoDB (Atlas)

1. Create cluster
2. Add DB user and network access
3. Set `MONGODB_URI` in backend environment

## Optional Advanced Extensions (ready for next iteration)

- Smart symptom scoring and follow-up question tree
- Medicine interaction warning matrix
- Personal health history timeline
- Offline emergency guide caching via service worker
- Multilingual prompts and translated UI output
