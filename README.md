# 🏡 Immoleaf CRM – Backend

Willkommen zum **Immoleaf** Projekt – einem mandantenfähigen CRM-System für die Immobilienverwaltung.  
Dieses Repository enthält das **Node.js/Express**-Backend inkl. Anbindung an **Azure Cosmos DB (MongoDB API)**.

---

## 🔧 Tech Stack

- **Backend:** Node.js (Express)
- **Datenbank:** Azure Cosmos DB (MongoDB API)
- **Deployment:** Azure App Service
- **CI/CD:** GitHub Actions

---

## 📁 Projektstruktur

```bash
/                            # Root-Verzeichnis des Repos
├── .github/
│   └── workflows/
│       └── main_immoleaf-backend.yml   # GitHub Actions CI/CD Pipeline
├── models/
│   ├── user.js              # Mongoose Modell: User
│   └── company.js           # Mongoose Modell: Company (Mandanten)
├── db.js                    # Verbindet mit Azure Cosmos DB
├── index.js                 # Einstiegspunkt des Backends
├── package.json             # Abhängigkeiten & Skripte
└── README.md                # Diese Datei
