const express = require("express");
const ManagerController = require("../controllers/ManagerController");
const UserController = require('../controllers/UserController');
const JWTAdmin = require("../middlewares/JWTAdmin");
const AdminController = require("../controllers/AdminController");
const AdminRout = express.Router();
AdminRout.use(express.json());

/**
 * @swagger
 * /admin/add-admin:
 *   post:
 *    summary: Adds admin
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin1234
 *    responses:
 *      '200':
 *        description: manager added successfully
 */
AdminRout.post("/add-admin",AdminController.insertAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *    summary: Admin login API
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin1234
 *    responses:
 *      '200':
 *        description: Admin logged in  successfully
 */
AdminRout.post("/login",UserController.adminLogin);

/**
 * @swagger
 * /admin/add-new-manager:
 *   post:
 *    summary: Adds a new manager
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
 *                 example: manager@gmail.com
 *               password:
 *                 type: string
 *                 example: manager1234
 *    responses:
 *      '200':
 *        description: manager added successfully
 */
AdminRout.post("/add-new-manager",JWTAdmin.verifyAccessToken.bind(JWTAdmin),ManagerController.insertNewManager);

 /**
 * @swagger
 * /admin/get-all-managers:
 *   get:
 *    summary: view all users
 *    description: API to view all users in table.
 *    responses:
 *      '200':
 *        description: User updated successfully
 */ 
//get all users
AdminRout.get("/get-all-managers",JWTAdmin.verifyAccessToken.bind(JWTAdmin),ManagerController.getAllManager);

/**
 * @swagger
 * /admin/get-manager/{id}:
 *   get:
 *    summary: found  a user by id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer 
 *    responses:
 *      '200':
 *        description: manager found successfully
 */

AdminRout.get("/get-manager/:id",JWTAdmin.verifyAccessToken.bind(JWTAdmin),ManagerController.getManagerById);

/**
 * @swagger
 * /admin/edit-manager/{id}:
 *   put:
 *    summary: update  a manager by id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer 
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
 *    responses:
 *      '200':
 *        description: manager details updated successfully
 */
AdminRout.put("/edit-manager/:id",JWTAdmin.verifyAccessToken.bind(JWTAdmin),ManagerController.editManagerById);


/**
 * @swagger
 * /admin/delete-manager/{id}:
 *   delete:
 *    summary: delete  a user by id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer 
 *    responses:
 *      '200':
 *        description: manager deleted successfully
 */
AdminRout.delete("/delete-manager/:id",JWTAdmin.verifyAccessToken.bind(JWTAdmin),ManagerController.deleteManagerById);

 /**
 * @swagger
 * /admin/new-access-token:
 *   get:
 *    summary: get new access token
 *    description: request to get new access token to perform operations.
 *    responses:
 *      '200':
 *        description: Admin gained access through new access token
 */ 
AdminRout.get("/new-access-token",JWTAdmin.grantNewAccessToken.bind(JWTAdmin));


module.exports = AdminRout;