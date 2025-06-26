
# 🖼️ Immoleaf Frontend (React + Vite)

Willkommen im Frontend-Repository von **Immoleaf**. Dieses Projekt ist mit [React](https://react.dev/) und [Vite](https://vitejs.dev/) aufgebaut und dient als Benutzeroberfläche für das Immoleaf CRM-Backend.

## 🚀 Tech Stack

- ⚛️ React (mit Hooks)
- ⚡ Vite (Blitzschnelles Build-Tool)
- 💅 TailwindCSS (optional)
- 🔗 Kommunikation mit Backend-API via Axios oder Fetch

## 📁 Projektstruktur

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## 🔧 Setup

1. Stelle sicher, dass du Node.js (v18+) und npm installiert hast
2. Navigiere in das `frontend/` Verzeichnis
3. Installiere die Abhängigkeiten:

```bash
npm install
```

4. Starte den lokalen Dev-Server:

```bash
npm run dev
```

Frontend ist dann unter `http://localhost:5173` erreichbar.

## 🔐 Backend API Konfiguration

Das Frontend spricht mit dem folgenden Backend:

```
https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/
```

API-Endpunkte (Beispiele):

- `POST /api/auth/register` → Registrierung
- `POST /api/auth/login` → Login
- `GET /api/users` → Alle Nutzer (auth erforderlich)

Diese URL sollte in `.env` gepflegt werden (siehe unten).

## 📁 .env Beispiel

```
VITE_API_BASE_URL=https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net
```

## 📦 Build für Produktion

```bash
npm run build
```

Das generiert ein statisches Build unter `dist/`, bereit für Deployment.

## 🌍 Deployment

Derzeit ist kein automatisches Deployment eingerichtet. Optionen:

- Vercel (empfohlen)
- Netlify
- Azure Static Web App

Ein GitHub Actions Workflow kann leicht ergänzt werden.

## 👤 Entwickler

Dieses Frontend ist für Marius vorbereitet, um sofort mit der Entwicklung starten zu können.

---

👉 Bei Fragen oder Erweiterungswünschen einfach Rücksprache mit @jebarron oder im Dev-Channel posten.
