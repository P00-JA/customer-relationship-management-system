const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./config/crm_database");
const roles = require("./routes/roles_rout");
const PORT = 3478;

const app = express();
app.use(express.json());

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API with SWAGGER",
      version: "1.0.0",
      description: "A sample api to demonstrate swagger with node.js",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

//swagger server
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use("/roles", roles);

// Sync program with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("All models are synchronized successfully");
  })
  .catch((error) => {
    console.log("Error occurred during model synchronization:", error);
  });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
