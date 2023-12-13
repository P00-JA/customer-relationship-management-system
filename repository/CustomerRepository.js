const Customers = require('../models/Customers');
const User = require('../models/Users');
const Role = require('../models/Roles');

const CustomerRepository = {
  async findUserByEmail(email) {
    return await User.findOne({ where: { email: email } });
  },

  async findCustomerRole() {
    return await Role.findOne({ where: { roleName: 'Customer' } });
  },

  async createCustomer(name, phone, branch, createdBySalesRep) {
    return await Customers.create({
      name: name,
      phone: phone,
      branch: branch,
      CreatedBy_SalesRepresentative: createdBySalesRep,
    });
  },

  async createUser(email, hashPassword, roleId, customerId) {
    return await User.create({
      email: email,
      password: hashPassword,
      RoleID: roleId,
      CustomerId: customerId,
    });
  },

  async findAllCustomers() {
    return await Customers.findAll();
  },

  async findCustomerById(id) {
    return await Customers.findByPk(id);
  },

  async updateCustomerById(id, data) {
    return await Customers.update(data, { where: { id: id } });
  },

  async deleteCustomerById(id) {
    return await Customers.destroy({ where: { id: id } });
  },
};

module.exports = CustomerRepository;
