# Immoleaf Frontend

## Schnellstart

1. Node.js (>= 18) installieren  
2. Repo klonen und in `/frontend` wechseln  
3. `npx create-react-app .` ausführen  
4. Development-Server starten:  
   ```bash
   npm start


# Immoleaf Frontend

Diese README-Datei dient Marius als ausführliche Anleitung, um das React-Frontend für Immoleaf direkt im `/frontend`-Verzeichnis zu entwickeln, zu starten und zu deployen.

---

## 📁 Ordnerstruktur im `frontend`-Verzeichnis

```text
/frontend
├── README.md           # Diese Anleitung
├── .gitignore          # Ignorierte Dateien
├── .env.example        # Vorlage für Umgebungsvariablen
├── package.json        # Definition der NPM-Skripte und Dependencies
├── public/             # Statische Assets (index.html, Favicons, Manifest)
└── src/                # React-Quellcode
    ├── index.js        # Einstiegspunkt der App
    ├── App.js          # Hauptkomponente
    ├── App.css         # Basis-Styles
    └── components/     # Wiederverwendbare UI-Komponenten
        └── ...
```

---

## 🛠️ Dateibeschreibungen

### 1. `README.md`

* Enthält diese detaillierte Anleitung für Setup, Entwicklung und Deployment.

### 2. `.gitignore`

* Ignoriert automatisch:

  * `node_modules/`
  * `build/`
  * Logdateien (`npm-debug.log*`)
  * Lokale Umgebungsdateien (`.env.local`)

### 3. `.env.example`

* Vorlage für lokale Umgebungsvariablen:

  ```env
  # URL der Backend-API
  REACT_APP_API_URL=https://immo-leaf-akaadqd5acczg7cm.westeurope-01.azurewebsites.net

  # Feature-Flags oder API-Keys
  REACT_APP_FEATURE_X_ENABLED=true
  ```

### 4. `package.json`

* **Scripts**:

  * `npm install`: Installiert alle Abhängigkeiten.
  * `npm start`: Startet den Dev-Server (Standard: [http://localhost:3000](http://localhost:3000)).
  * `npm run build`: Erzeugt den Produktions-Build im Ordner `build/`.
  * `npm test`: Führt Tests aus (sofern eingerichtet).
* **Dependencies**:

  * React, ReactDOM sowie später Axios, React Router etc.

### 5. `public/`

* Statische Dateien:

  * `index.html`: Root-HTML-Datei, in die React injected wird.
  * Icons, Manifest, `favicon.ico`.

### 6. `src/index.js`

* Einstiegspunkt:

  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import './App.css';

  ReactDOM.render(<App />, document.getElementById('root'));
  ```

### 7. `src/App.js`

* Hauptkomponente:

  ```js
  import React from 'react';

  function App() {
    return (
      <div className="App">
        <h1>Willkommen bei Immoleaf!</h1>
      </div>
    );
  }

  export default App;
  ```

### 8. `src/App.css`

* Basis-CSS:

  ```css
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .App {
    text-align: center;
    padding: 2rem;
  }
  ```

---

## 🚀 Lokaler Entwicklungs-Workflow

1. **Repo klonen & Verzeichnis wechseln**:

   ```bash
   git clone https://github.com/<DEIN_USER>/Immoleaf.git
   cd Immoleaf/frontend
   ```

2. **Dependencies installieren**:

   ```bash
   npm install
   ```

3. **Dev-Server starten**:

   ```bash
   npm start
   ```

   → öffne `http://localhost:3000`

4. **Umgebungsvariablen**:

   * Erstelle eine Datei `.env.local` im `/frontend`-Ordner.
   * Kopiere den Inhalt aus `.env.example` und passe die Werte an.

5. **Hot-Reload & Entwicklung**:

   * Änderungen an Dateien unter `src/` lösen sofort ein Live-Reload im Browser aus.

6. **Änderungen committen & pushen**:

   ```bash
   git add .
   git commit -m "Feature: Beschreibung"
   git push origin main
   ```

   → Der CI/CD-Workflow deployed automatisch in Azure.

---

## 📦 Produktions-Build & Deployment

1. **Build erzeugen**:

   ```bash
   npm run build
   ```

   → Erzeugt optimierten Build in `/frontend/build`

2. **Deployment**:

   * Der GitHub Actions Workflow greift automatisch und deployed das Verzeichnis `/frontend/build` auf eure Azure Static Web App oder App Service.

---

## 📖 Hilfreiche Links

* [React Dokumentation](https://reactjs.org/docs/getting-started.html)
* [Create React App](https://create-react-app.dev/docs/getting-started/)
* [Umgebungsvariablen in CRA](https://create-react-app.dev/docs/adding-custom-environment-variables/)
* [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/)

---

*Viel Erfolg, Marius! Bei Fragen oder Erweiterungswünschen stehe ich bereit.*
