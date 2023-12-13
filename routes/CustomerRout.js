const express = require("express");
const UserController = require('../controllers/UserController');
const JWTCustomer = require("../middlewares/JWTCustomer");
const CustomerController = require("../controllers/CustomerController");
const TransactionController = require("../controllers/TransactionController");
const CustomerRout = express.Router();
CustomerRout.use(express.json());

CustomerRout.post("/login",UserController.customerLogin);

CustomerRout.put("/edit-details/:id",JWTCustomer.verifyAccessToken.bind(JWTCustomer),CustomerController.editCustomerById);

CustomerRout.get("/get-customer/:id",JWTCustomer.verifyAccessToken.bind(JWTCustomer),CustomerController.getCustomerById);

CustomerRout.post("/transaction",JWTCustomer.verifyAccessToken.bind(JWTCustomer),TransactionController.customerAddedTransaction);

CustomerRout.get("/new-access-token",JWTCustomer.grantNewAccessToken.bind(JWTCustomer));

module.exports = CustomerRout;