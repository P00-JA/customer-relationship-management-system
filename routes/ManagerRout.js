const express = require("express");
const ManagerController = require("../controllers/ManagerController");
const UserController = require('../controllers/UserController');
const JWTManager = require("../middlewares/JWTManager");
const SalesRepresentativeController = require("../controllers/SalesRepresentativeController");
const CustomerController = require("../controllers/CustomerController");
const TransactionController = require("../controllers/TransactionController");
const ManagerRout = express.Router();
ManagerRout.use(express.json());

/**
 * @swagger
 * /manager/login:
 *   post:
 *    summary: manager login API
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: manager@gmail.com
 *               password:
 *                 type: string
 *                 example: manager1234
 *    responses:
 *      '200':
 *        description: manager logged in  successfully
 */
ManagerRout.post("/login",UserController.ManagerLogin)

/**
 * @swagger
 * /manager/add-new-sales-representative:
 *   post:
 *    summary: Adds a new sales representative
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: name
 *               phone:
 *                 type: integer
 *                 example: 1234567890
 *               branch:
 *                 type: string
 *                 example: place
 *               email:
 *                 type: string
 *                 example: username@gmail.com
 *               password:
 *                 type: string
 *                 example: user1234
 *    responses:
 *      '200':
 *        description: sales representative added successfully
 */
ManagerRout.post("/add-new-sales-representative", JWTManager.verifyAccessToken.bind(JWTManager),SalesRepresentativeController.insertNewSalesRepresentative);

ManagerRout.get("/get-sales-representative/:id", JWTManager.verifyAccessToken.bind(JWTManager),SalesRepresentativeController.editSalesRepresentativeById);

ManagerRout.put("/edit-sales-representative/:id", JWTManager.verifyAccessToken.bind(JWTManager),SalesRepresentativeController.editSalesRepresentativeById);

ManagerRout.get("/get-all-sales-representative",JWTManager.verifyAccessToken.bind(JWTManager),SalesRepresentativeController.getAllSalesRepresentative);

ManagerRout.delete("/delete-sales-representative/:id",JWTManager.verifyAccessToken.bind(JWTManager),SalesRepresentativeController.deleteSalesRepresentativeById);

ManagerRout.get("/get-customer/:id",JWTManager.verifyAccessToken.bind(JWTManager),CustomerController.getCustomerById);

ManagerRout.get("/transactions-by-sales-representative",JWTManager.verifyAccessToken.bind(JWTManager),TransactionController.salesRepTransaction);

ManagerRout.get("/transactions-by-customers",JWTManager.verifyAccessToken.bind(JWTManager),TransactionController.customerTransaction);

ManagerRout.get("/customers-deals",JWTManager.verifyAccessToken.bind(JWTManager),TransactionController.joinCustomersAndDeal);

ManagerRout.get("/monthly-customer-transaction",JWTManager.verifyAccessToken.bind(JWTManager),TransactionController.monthlyCustomerTransaction);

ManagerRout.get("/monthly-sales-representative-transaction",JWTManager.verifyAccessToken.bind(JWTManager),TransactionController.monthlySalesRepTransaction);

ManagerRout.get("/get-all-customers",JWTManager.verifyAccessToken.bind(JWTManager),CustomerController.getAllCustomers);

ManagerRout.get("get-new-access-token",JWTManager.grantNewAccessToken.bind(JWTManager));

module.exports = ManagerRout;