const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hall Booking API",
      version: "1.0.0",
      description: "API for creating and managing halls",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Path to your API files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = { swaggerDocs, swaggerUi };
