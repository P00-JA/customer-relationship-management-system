const RoleService = require('../service/RoleService');

const RolesController = {
  async insertRoles(req, res) {
      const roleName = req.body.roleName;
      const result = await RoleService.insert_role(roleName);

      if (result.error) {
        return res.status(409).json({errors: result.error});
      }
      res.json({ role: result.role });
  },

  async getAllRoles(req, res) {
    const roles = await RoleService.get_all_roles();
    console.log(roles);
    if (roles.error) {
      return res.json(roles.error);
    } else {
      res.json(roles);
    }
  },

  async getRoleById(req, res) {
    const roleId = req.params.id;
    let role = await RoleService.get_role_by_id(roleId);
    if (role.error) {
      return res.json(role.error);
    } else {
      res.json(role);
    }
  },
};

module.exports = RolesController;
