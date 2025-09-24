

# payani maga Full Stack App

## Team Project
**Team Members:** Jeeva, Yeshwanth J

---

### Commit Messages

#### Jeeva
1. feat: integrated Firebase authentication (email/password & Google)
2. style: applied furniture-style pastel theme to all pages
3. fix: resolved TypeScript module error for firebase imports
4. feat: added AI chat and itinerary generation via FastAPI backend
5. docs: updated README with setup and usage instructions

#### Yeshwanth J
1. feat: implemented budget breakdown and weather insights UI
2. refactor: improved responsive layout for mobile and desktop
3. fix: handled backend error responses and improved API validation
4. feat: added registration and login forms with validation
5. docs: documented project structure and troubleshooting steps

>This project is a modern full-stack travel planner built with React, TypeScript, Vite (frontend), and FastAPI (backend). It features Firebase authentication (email/password & Google login), AI-powered itinerary generation, budget management, weather insights, and more.

---

---

## Features
- Elegant furniture-style UI with pastel gradients and serif fonts
- User authentication (email/password & Google via Firebase)
- AI chat and itinerary generation (Ollama3 backend)
- Budget breakdown, weather, and safety insights
- Responsive design with Tailwind CSS

---

## Getting Started

### 1. Clone the Repository
```sh
git clone url
cd payani-maga
```

### 2. Install Frontend Dependencies
```sh
cd frontend
npm install
```

### 3. Install Backend Dependencies
```sh
cd ../backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Setup Firebase
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Add a Web App and copy your config to `src/firebase.js`:
  ```js
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  ```
- Enable Email/Password and Google sign-in in Firebase Authentication

### 5. Run Backend (FastAPI)
```sh
uvicorn main:app --reload
```

### 6. Run Frontend (Vite)
```sh
npm run dev
```

---

## Project Structure
- `backend/` - FastAPI backend (main.py)
- `projects-.../src/` - React frontend (pages, components)
- `src/firebase.js` - Firebase config and initialization
- `firebase.d.ts` - TypeScript declaration for Firebase module (should be in project root)

---

## Usage
- Register or login with email/password or Google
- Plan your trip, get AI-generated itineraries, and manage your budget
- Chat with AI for travel advice

---

## Customization & Theming
- All pages use a modern furniture-style theme (pastel gradients, serif fonts)
- Easily customize colors and fonts in Tailwind config and page components

---

## Troubleshooting
- If you see TypeScript errors for `../firebase`, ensure `firebase.d.ts` is in the project root
- Restart VS Code or TypeScript server after moving type files

---

## License
MIT
