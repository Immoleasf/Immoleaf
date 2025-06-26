# 🖥️ Immoleaf Frontend

Willkommen im Frontend des Immoleaf-Projekts! Diese Anwendung basiert auf **React** mit **Vite** als Build-Tool. Sie kommuniziert mit dem Immoleaf-Backend über eine REST API und dient als Benutzeroberfläche für unsere CRM-Plattform.

---

## 🚀 Schnellstart

### 🔧 Voraussetzungen

- Node.js (empfohlen: ≥ 18.x)
- Paketmanager: `npm` oder `yarn`

### 📦 Abhängigkeiten installieren

```bash
cd frontend
npm install
```

### 🏃 Lokale Entwicklung starten

```bash
npm run dev
```

> Öffnet standardmäßig [http://localhost:5173](http://localhost:5173)

---

## 🌐 Backend-API

Das Frontend kommuniziert mit diesem Backend:

**Base URL**  
[`https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net`](https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net)

Du kannst z. B. folgende Endpunkte aufrufen:

- [`/api/health`](https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/api/health)
- [`/api/users`](https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/api/users)
- [`/api/auth/login`](https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/api/auth/login)
- [`/api/swagger`](https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/api/swagger)

---

## ⚙️ .env Konfiguration (optional)

Erstelle eine `.env` Datei im Ordner `frontend/`:

```env
VITE_API_BASE=https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net
```

---

## 📁 Projektstruktur

```bash
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧪 Nützliche Scripts

| Befehl            | Beschreibung                        |
|-------------------|-------------------------------------|
| `npm run dev`     | Dev-Server starten                  |
| `npm run build`   | App für Produktion bauen            |
| `npm run preview` | Vorschau der Produktion starten     |

---

## 🧑‍💻 Entwicklungshinweise

- Authentifizierung erfolgt via JWT (Login-Endpunkt im Backend).
- API-Aufrufe über `fetch` oder Axios auf `VITE_API_BASE`.

---

## 🔒 Deployment (optional)

Deployment erfolgt z. B. über GitHub Actions (CI/CD), Azure Static Web Apps oder Vercel/Netlify.  
→ Eine passende Workflow-Datei folgt im nächsten Schritt.

---

## 👤 Autor

Marius & Backend-Team Immoleaf  
Kontakt: `marius@immoleaf.de`
