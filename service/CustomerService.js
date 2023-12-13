const bcrypt = require('bcrypt');
const CustomerRepository = require('../repository/CustomerRepository');

const CustomerService = {
  async insert_new_customer(name, email, password, phone, branch, createdBySalesRep) {
    try {
      const existingUser = await CustomerRepository.findUserByEmail(email);
      if (existingUser) {
        return { error: { message: 'Customer account already exists!' } };
      }

      const customerRole = await CustomerRepository.findCustomerRole();
      if (!customerRole) {
        return { error: { message: 'Customer role not found.' } };
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const roleIdOfCustomer = customerRole.id;

      const newCustomer = await CustomerRepository.createCustomer(
        name,
        phone,
        branch,
        createdBySalesRep
      );
      const createdUser = await CustomerRepository.createUser(
        email,
        hashPassword,
        roleIdOfCustomer,
        newCustomer.id
      );

      return { customerData: newCustomer };
    } catch (error) {
      console.error('Error registering customer:', error);
      return { error: 'Server error' };
    }
  },

  async get_all_customers() {
    return await CustomerRepository.findAllCustomers();
  },

  async get_customer_by_id(id) {
    return await CustomerRepository.findCustomerById(id);
  },

  async edit_customer_by_id(id, data) {
    const filteredData = { ...data };
    delete filteredData.password;
    delete filteredData.email;

    return await CustomerRepository.updateCustomerById(id, filteredData);
  },

  async delete_customer_by_id(id) {
    return await CustomerRepository.deleteCustomerById(id);
  },
};

module.exports = CustomerService;
