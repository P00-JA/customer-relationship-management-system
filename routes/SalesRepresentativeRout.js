const express = require("express");
const SalesRepresentativeController = require("../controllers/SalesRepresentativeController");
const UserController = require('../controllers/UserController');
const JWTSalesRepresentative = require("../middlewares/JWTSalesRepresentative");
const CustomerController = require("../controllers/CustomerController");
const TransactionController = require("../controllers/TransactionController");
const SalesRepresentativeRout = express.Router();
SalesRepresentativeRout.use(express.json());

/**
 * @swagger
 * /sales-representative/login:
 *   post:
 *    summary: sales representative login API
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: salesrep@gmail.com
 *               password:
 *                 type: string
 *                 example: salesrep234
 *    responses:
 *      '200':
 *        description: Sales representative logged in  successfully
 */
SalesRepresentativeRout.post("/login",UserController.salesRepresentativeLogin);

SalesRepresentativeRout.post("/add-new-customers",JWTSalesRepresentative.verifyAccessToken.bind(JWTSalesRepresentative),CustomerController.insertNewCustomer);

SalesRepresentativeRout.get("/get-customer/:id",JWTSalesRepresentative.verifyAccessToken.bind(JWTSalesRepresentative),CustomerController.getCustomerById);

SalesRepresentativeRout.put("/edit-customer/:id",JWTSalesRepresentative.verifyAccessToken.bind(JWTSalesRepresentative),CustomerController.editCustomerById);

SalesRepresentativeRout.get("/get-all-customers",JWTSalesRepresentative.verifyAccessToken.bind(JWTSalesRepresentative),CustomerController.getAllCustomers);

SalesRepresentativeRout.delete("/delete-customer/:id",JWTSalesRepresentative.verifyAccessToken.bind(JWTSalesRepresentative),CustomerController.deleteCustomerById);

SalesRepresentativeRout.post("/transaction",JWTSalesRepresentative.verifyAccessToken.bind(JWTSalesRepresentative),TransactionController.salesRepAddedTransaction);

SalesRepresentativeRout.get("/customers-deals",JWTSalesRepresentative.verifyAccessToken.bind(JWTSalesRepresentative),TransactionController.joinCustomersAndDeal);

SalesRepresentativeRout.get("/new-access-token",JWTSalesRepresentative.grantNewAccessToken.bind(JWTSalesRepresentative));

module.exports = SalesRepresentativeRout;
