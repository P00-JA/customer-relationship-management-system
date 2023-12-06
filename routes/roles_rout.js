const express = require("express");
const RolesController = require("../controllers/RolesController");
const rolesRout = express.Router();
rolesRout.use(express.json());

/**
 * @swagger
 * /roles/new-role:
 *   post:
 *    summary: Adds a new role
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: Sales Executive
 *    responses:
 *      '200':
 *        description: role added successfully
 */
rolesRout.post("/new-role", RolesController.insertRoles);

/**
 * @swagger
 * /roles/:
 *   get:
 *    summary: view all roles
 *    description:  view all roles in table.
 *    responses:
 *      '200':
 *        description: all roleNames inserted in the table roles
 */
rolesRout.get("/", RolesController.getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *    summary: found  a roleName by id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *    responses:
 *      '200':
 *        description: roleName found successfully
 */
rolesRout.get("/:id", RolesController.getRoleById);

module.exports = rolesRout;
