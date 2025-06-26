# 📘 Immoleaf CRM – Backend

Dieses Backend bildet die Grundlage für das CRM-System **Immoleaf**. Es basiert auf **Node.js**, **Express**, **MongoDB** (Azure CosmosDB), verwendet **JWT-Authentifizierung**, bietet eine **Swagger-Dokumentation** und ist vollständig für **mandantenfähige Anwendungen** vorbereitet.

---

## 🔗 Live Backend URL

> **Base URL:**  
> `https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net`

| Endpoint                 | Beschreibung                                         |
|--------------------------|------------------------------------------------------|
| `/api`                   | Übersicht aller API-Endpunkte (JSON)                |
| `/api/health`            | Health Check                                        |
| `/api/users`            | GET = Benutzer abrufen (JWT erforderlich), POST = Benutzer anlegen |
| `/api/auth/register`     | Registrierung mit JWT-Token                         |
| `/api/auth/login`        | Login, gibt JWT zurück                              |
| `/api/swagger` / `/api/docs` | Swagger UI für Entwicklerdokumentation           |

---

## ⚙️ Setup (lokal, falls notwendig)

```bash
npm install
node index.js
```

---

## 🧭 Projektstruktur

```bash
.
├── index.js                   # Hauptentrypoint
├── db.js                      # Verbindung zu MongoDB
├── models/
│   ├── User.js                # Benutzermodell
│   └── Company.js             # Companymodell
├── middleware/
│   └── auth.js                # JWT-Middleware
├── routes/
│   └── auth.js                # /auth/register und /auth/login
├── .github/
│   └── workflows/
│       └── main_immoleaf-backend.yml
├── package.json
└── README.md                  # Diese Datei
```

---

## 🔐 JWT Authentifizierung

- Registrierung/Login über `/api/auth`
- Gesicherte Endpunkte erwarten:

```http
Authorization: Bearer <JWT-Token>
```

---

## 🧪 Beispielanfragen

### Registrierung

POST `/api/auth/register`

```json
{
  "name": "Marius",
  "email": "marius@immoleaf.de",
  "password": "123456",
  "tenantId": "demo"
}
```

### Login

POST `/api/auth/login`

```json
{
  "email": "marius@immoleaf.de",
  "password": "123456"
}
```

Antwort: `{ "token": "..." }`

---

## 🧾 API Dokumentation (Swagger)

- Live-Dokumentation mit Swagger verfügbar unter:  
  → [`/api/swagger`](https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/api/swagger)

---

## 🚀 Deployment

- Automatisiert via GitHub Actions (`main_immoleaf-backend.yml`)
- Trigger: Push auf `main`

---

## ✅ ToDos

- [ ] Company-Verwaltung (Multitenancy)
- [ ] Logging mit Application Insights
- [ ] Erweiterung von Benutzerrollen und Berechtigungen
- [ ] React Admin Dashboard (Frontend bereits vorbereitet)

---

## 🧑‍💻 Entwickler: Du & Marius 💪