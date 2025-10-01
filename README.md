# Resume Skill Tree Website

A web application that visualizes and analyzes student skills, strengths, and career pathways using interactive skill trees and data-driven insights. Built with React, Vite, and Firebase.

Original project design: [Figma Link](https://www.figma.com/design/jS32NyRu7x3J4ERogtxq5h/Resume-Skill-Tree-Website)

---

## Running the Code

1. **Install dependencies:**
   ```sh
   npm i
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

---

## Features

- **Skill Tree Visualization:** Interactive display of student skills and progress.
- **Resume Upload & Analysis:** Upload resumes and extract relevant skills.
- **AI Career Advisor:** Get personalized career recommendations.
- **Market Trends Analysis:** See trending skills and job market data.
- **Student Pathway Planner:** Plan and track educational and career goals.
- **Supabase & Firebase Integration:** Secure data storage and authentication.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)

---

## Development

To start the development server:
```sh
npm run dev
```

---

## Building for Production

To build the app for production:
```sh
npm run build
```
This will output the production files to the `build` directory.

---

## Deploying to Firebase Hosting

1. **Login to Firebase:**
   ```sh
   firebase login
   ```

2. **Initialize Firebase Hosting (if not already done):**
   ```sh
   firebase init hosting
   ```
   - Set the public directory to `build`
   - Configure as a single-page app: **No**
   - Do **not** overwrite `index.html` if prompted

3. **Build your project:**
   ```sh
   npm run build
   ```

4. **Deploy to Firebase:**
   ```sh
   firebase deploy
   ```

5. **Open the provided hosting URL to view your live site.**

---

## Project Structure

```
src/
  components/         # React components
  styles/             # CSS files
  supabase/           # Supabase server functions
  utils/              # Utility functions
  App.tsx             # Main app component
  main.tsx            # Entry point
build/                # Production build output (after build)
firebase.json         # Firebase Hosting configuration
```

---

## License

This project is licensed under the MIT License.

---

## Attributions

See [src/Attributions.md](src/Attributions.md) for third-party libraries and resources used.
