const { where } = require("sequelize");
const rolesData = require("../models/roles");
const RolesController = {
  async insertRoles(req, res) {
    try {
      let role = await rolesData.findOne({
        where: { roleName: req.body.roleName },
      });
      if (role) {
        return res.status(409).json({ errors: { message: "role already exists" }});
      }
      role = await rolesData.create({
        roleName: req.body.roleName,
      });

      res.json({ role: role });
    } catch (error) {
      console.error("Error inserting role:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  async getAllRoles(req, res) {
    const roles = await rolesData.findAll();
    console.log(roles);
    if (roles) {
      return res.json(roles);
    } else {
      res.json({ error: { message: "no roles inserted yet!" } });
    }
  },

  async getRoleById(req, res) {
    let role = await rolesData.findByPk(req.params.id);
    if (role) {
      res.json({
        id: role.id,
        roleName: role.roleName,
      });
    }
  },
};

module.exports = RolesController;
