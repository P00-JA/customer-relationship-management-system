const express = require("express");
const RolesController = require("../controllers/RolesController");
const rolesRout = express.Router();
rolesRout.use(express.json());

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
 *    summary: find  a roleName by id
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

rolesRout.post("/add-role",RolesController.insertRoles);

module.exports = rolesRout;
