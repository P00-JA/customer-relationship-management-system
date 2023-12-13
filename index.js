const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./config/crm_database");
const roles = require("./routes/RolesRout");
const manager = require("./routes/ManagerRout");
const admin = require('./routes/AdminRout');
const salesRepresentative = require('./routes/SalesRepresentativeRout');
const customer = require('./routes/CustomerRout');
const PORT = 3478;

const app = express();

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API with SWAGGER",
      version: "1.0.0",
      description: "A api to demonstrate swagger with node.js",
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
app.use("/manager",manager);
app.use("/admin",admin);
app.use("/sales-representative",salesRepresentative);
app.use("/customer",customer)

// Sync program with the database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("All models are synchronized successfully");
  })
  .catch((error) => {
    console.log("Error occurred during model synchronization:", error);
  });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
