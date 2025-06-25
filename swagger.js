const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Immoleaf API',
      version: '1.0.0',
      description: 'Live Swagger-Dokumentation für das Immoleaf Backend',
    },
    servers: [
      {
        url: 'https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net',
        description: 'Azure App Service',
      },
    ],
  },
  apis: ['./index.js', './models/*.js'], // Kommentarbasiert
};

module.exports = swaggerJSDoc(options);
