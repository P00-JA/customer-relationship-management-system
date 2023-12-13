const Manager = require('../models/Manager');
const User = require('../models/Users');
const Role = require('../models/Roles');

const ManagerRepository = {
  async findUserByEmail(email) {
    return await User.findOne({ where: { email: email } });
  },

  async findManagerRole() {
    return await Role.findOne({ where: { roleName: 'Manager' } });
  },

  async createManager(name, phone, branch) {
    return await Manager.create({
      name: name,
      phone: phone,
      branch: branch,
    });
  },

  async createUser(email, hashPassword, roleId, managerId) {
    return await User.create({
      email: email,
      password: hashPassword,
      RoleID: roleId,
      ManagerId: managerId,
    });
  },

  async findAllManagers() {
    return await Manager.findAll();
  },

  async findManagerById(id) {
    return await Manager.findByPk(id);
  },

  async updateManagerById(id, data) {
    return await Manager.update(data, { where: { id: id } });
  },

  async deleteManagerById(id) {
    return await Manager.destroy({ where: { id: id } });
  },
};

module.exports = ManagerRepository;
