# 🏠 ImmoLeaf – Immobilien & Gemeinden CRM

**ImmoLeaf** ist eine moderne CRM-Lösung für die Verwaltung von Immobilien, Gemeinden, Ansprechpartnern, Verträgen und Aufgaben. Die Anwendung basiert vollständig auf **Azure Cloud-Infrastruktur** und verwendet GitHub für **CI/CD-Deployment**.  

> 📦 Backend mit Node.js, Express & MongoDB (Cosmos DB)  
> 🌐 Frontend mit React (entwickelt von Marius)  
> ☁️ Hosting & Datenbank in Azure (App Service + Cosmos DB)  
> 🔄 Vollautomatisiertes Deployment via GitHub Actions  

---

## ⚙️ Technologie-Stack

| Bereich         | Technologie                                  |
|----------------|-----------------------------------------------|
| Backend         | Node.js (v22 LTS), Express                   |
| Datenbank       | Azure Cosmos DB (MongoDB API)                |
| Frontend        | React (separat in eigenem Repo)              |
| Deployment      | Azure App Service                            |
| CI/CD           | GitHub Actions                               |
| Secrets/Config  | Azure App Settings + GitHub Secrets          |

---

## 🚀 Live Deployment

**Backend läuft unter:**  
➡️ [https://immo-leaf-akaadqd5acczg7cm.westeurope-01.azurewebsites.net](https://immo-leaf-akaadqd5acczg7cm.westeurope-01.azurewebsites.net)

---

## 🧠 Funktionen (geplant)

- ✅ Immobilien-Management (CRUD)
- ✅ Gemeinden & Ansprechpartner
- ✅ Kontaktverwaltung
- ✅ Aufgaben & Kalenderintegration
- 🔐 Authentifizierung (JWT oder Azure AD – TBD)
- 📊 Analytics & Dashboards (später)

---

## 📁 Projektstruktur

```bash
Immoleaf/
│
├── index.js               # Einstiegspunkt der App
├── package.json           # Abhängigkeiten & Scripts
├── .env.example           # Beispiel-Umgebungsvariablen
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions für CI/CD
