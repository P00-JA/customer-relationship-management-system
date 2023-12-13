const bcrypt = require('bcrypt');
const SalesRepresentativeRepository = require('../repository/SalesRepresentativeRepository');

const SalesRepresentativeService = {
  async insert_new_sales_representative(name, email, password, phone, branch, createdByManager) {
    try {
      const existingUser = await SalesRepresentativeRepository.findUserByEmail(email);
      if (existingUser) {
        return { error: { message: 'Sales Rep account already exists!' } };
      }

      const salesRepRole = await SalesRepresentativeRepository.findSalesRepRole();
      if (!salesRepRole) {
        return { error: { message: 'Sales Rep role not found.' } };
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const roleIdOfSalesRep = salesRepRole.id;

      const newSalesRep = await SalesRepresentativeRepository.createSalesRepresentative(
        name,
        phone,
        branch,
        createdByManager
      );
      const createdUser = await SalesRepresentativeRepository.createUser(
        email,
        hashPassword,
        roleIdOfSalesRep,
        newSalesRep.id
      );

      return { SalesRepData: newSalesRep };
    } catch (error) {
      console.error('Error registering sales representative:', error);
      return { error: 'Server error' };
    }
  },

  async get_all_sales_representatives() {
    return await SalesRepresentativeRepository.findAllSalesRepresentatives();
  },

  async get_sales_representative_by_id(id) {
    return await SalesRepresentativeRepository.findSalesRepresentativeById(id);
  },

  async edit_sales_representative_by_id(id, data) {
    const filteredData = { ...data };
    delete filteredData.password;
    delete filteredData.email;

    return await SalesRepresentativeRepository.updateSalesRepresentativeById(id, filteredData);
  },

  async delete_sales_representative_by_id(id) {
    return await SalesRepresentativeRepository.deleteSalesRepresentativeById(id);
  },
};

module.exports = SalesRepresentativeService;
