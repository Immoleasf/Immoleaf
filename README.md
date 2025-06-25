# 🏠 Immoleaf CRM – Backend

Immoleaf ist ein mandantenfähiges CRM-System, bei dem das Backend mit **Node.js**, **Express**, **MongoDB (CosmosDB)** und **Azure App Service** betrieben wird.  
Das Ziel ist es, eine skalierbare, cloudbasierte Lösung für Kundendaten und Unternehmensprozesse bereitzustellen.

---

## 🚀 Projektstruktur

```
/
├── .github/workflows/
│   └── main_immoleaf-backend.yml     # CI/CD Workflow für Azure Deployment
├── models/
│   ├── User.js                       # Mongoose Schema für Benutzer
│   └── Company.js                    # Mongoose Schema für Unternehmen
├── db.js                             # Datenbankverbindung
├── index.js                          # Hauptserver + API Routing
├── package.json                      # Dependencies & Startscript
```

---

## ☁️ Deployment

Deployment erfolgt automatisch via GitHub Actions in Azure App Service:

- **App Service URL**:  
  `https://immoleaf-backend.azurewebsites.net`  
  (→ Alias mit GUID: `https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net`)

- **Azure Ressourcengruppe**: `immoleaf-rg`  
- **Cosmos DB Account**: `immoleaf-db`  
- **Deployment Slot**: `production`

---

## 🔌 Verfügbare Umgebungsvariablen

| Name         | Beschreibung                   |
|--------------|--------------------------------|
| `PORT`       | (Optional) Port für Express    |
| `MONGO_URI`  | MongoDB-Verbindungs-String     |

> `MONGO_URI` ist im App Service als Umgebungsvariable gespeichert.

---

## 📚 API-Endpunkte

| Route                    | Methode | Beschreibung                       |
|--------------------------|---------|------------------------------------|
| `/`                      | GET     | Willkommensnachricht               |
| `/api/health`            | GET     | Health Check                       |
| `/api`                   | GET     | JSON Übersicht aller APIs          |
| `/api/docs`              | GET     | 📘 HTML API-Dokumentation          |
| `/api/users`             | GET     | Alle Benutzer abrufen              |
| `/api/users`             | POST    | Benutzer erstellen (name, email)   |

---

## 🔗 Interne Links (App Service)

- 🌐 **Base URL**  
  https://immoleaf-backend.azurewebsites.net

- 🛠 **Deployment Logs**  
  https://immoleaf-backend.scm.azurewebsites.net/api/logs/docker

- 📘 **HTML API Übersicht**  
  https://immoleaf-backend.azurewebsites.net/api/docs

- 🩺 **Health Check**  
  https://immoleaf-backend.azurewebsites.net/api/health

- 👥 **Benutzer anzeigen**  
  https://immoleaf-backend.azurewebsites.net/api/users

---

## 🧪 Beispiel-Request (User anlegen)

```bash
curl -X POST https://immoleaf-backend.azurewebsites.net/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Marius", "email": "marius@immoleaf.de"}'
```

---

## 🧠 Weitere Schritte

- [ ] Frontend-Integration (React)
- [ ] Authentifizierung / Mandantentrennung
- [ ] Logging & Monitoring
- [ ] Swagger / OpenAPI hinzufügen

---

## 🤝 Beteiligte

- **Jebarron** – Backend & DevOps  
- **Marius** – Frontend (React)

---

> Letztes Update: Juni 2025
