const User = require('../models/Users');
const Role = require('../models/Roles');

const AdminRepository = {
  async findUserByEmail(email) {
    return await User.findOne({ where: { email: email } });
  },

  async findAdminRole() {
    return await Role.findOne({ where: { roleName: 'Admin' } });
  },

  async createUser(email, hashPassword, roleId) {
    return await User.create({
      email: email,
      password: hashPassword,
      RoleID: roleId,
    });
  },
};

module.exports = AdminRepository;
