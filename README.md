# 🏢 Immoleaf CRM – Backend

Willkommen im **Immoleaf CRM Backend**! Dieses Projekt ist eine Node.js-Anwendung mit MongoDB (Cosmos DB), gehostet auf **Azure App Services** mit vollständiger CI/CD GitHub-Anbindung.

---

## 🌐 Base URL
Alle API-Endpunkte starten mit:

```
https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/
```

---

## 📚 API-Endpunkte

### 🔧 Health Check
- **GET** `/api/health`  
  Prüft, ob der Server läuft.

### 👥 Benutzer
- **GET** `/api/users`  
  Gibt eine Liste aller Benutzer zurück.
- **POST** `/api/users`  
  Erstellt einen neuen Benutzer.  
  Body:
  ```json
  {
    "name": "Max Mustermann",
    "email": "max@immoleaf.de"
  }
  ```

### 🧠 Swagger API Doku
- **GET** [`/api/docs`](https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/api/docs)  
  Vollautomatisch generierte API-Dokumentation mit Swagger UI.

---

## 🛠 Projektstruktur

```
.
├── .github/workflows
│   └── main_immoleaf-backend.yml
├── models
│   ├── user.js
│   └── company.js
├── db.js
├── index.js
├── swagger.js
├── package.json
```

---

## 🚀 Deployment

Automatisch über GitHub Actions bei jedem Push auf den `main`-Branch.

---

## 🧪 Testdaten (Beispiel)

Nutze Swagger unter `/api/docs`, um testweise Benutzer hinzuzufügen oder bestehende User abzurufen.

---

## ✨ Todo (zukunft)
- [ ] Mandantenfähigkeit (TenantId)
- [ ] Authentifizierung & Rollen
- [ ] Admin UI
- [ ] Kundenverwaltung
- [ ] Logging / Monitoring