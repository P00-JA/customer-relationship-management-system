const SalesRepresentative = require('../models/SalesRepresentative');
const User = require('../models/Users');
const Role = require('../models/Roles');

const SalesRepresentativeRepository = {
  async findUserByEmail(email) {
    return await User.findOne({ where: { email: email } });
  },

  async findSalesRepRole() {
    return await Role.findOne({ where: { roleName: 'Sales Representative' } });
  },

  async createSalesRepresentative(name, phone, branch, createdByManager) {
    return await SalesRepresentative.create({
      name: name,
      phone: phone,
      branch: branch,
      CreatedBy_Manager: createdByManager,
    });
  },

  async createUser(email, hashPassword, roleId, salesRepId) {
    return await User.create({
      email: email,
      password: hashPassword,
      RoleID: roleId,
      SalesRepresentativeId: salesRepId,
    });
  },

  async findAllSalesRepresentatives() {
    return await SalesRepresentative.findAll();
  },

  async findSalesRepresentativeById(id) {
    return await SalesRepresentative.findByPk(id);
  },

  async updateSalesRepresentativeById(id, data) {
    return await SalesRepresentative.update(data, { where: { id: id } });
  },

  async deleteSalesRepresentativeById(id) {
    return await SalesRepresentative.destroy({ where: { id: id } });
  },
};

module.exports = SalesRepresentativeRepository;
