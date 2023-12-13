const rolesData = require('../models/Roles');

const RoleRepository = {
    async findOneRoleByRoleName(roleName) {
        return await rolesData.findOne({where: { roleName: roleName }});
      },

      async createRole(roleData) {
        return await rolesData.create(roleData);
      },

      async findAllRoles() {
        return await rolesData.findAll();
      },

      async findRoleById(id) {
        return await rolesData.findByPk(id);
      },
};

module.exports = RoleRepository;
