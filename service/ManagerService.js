const bcrypt = require('bcrypt');
const ManagerRepository = require('../repository/ManagerRepository');

const ManagerService = {
  async insert_new_manager(name, email, password, phone, branch) {
    try {
      const existingUser = await ManagerRepository.findUserByEmail(email);
      if (existingUser) {
        return { error: { message: 'User account already exists!' } };
      }

      const managerRole = await ManagerRepository.findManagerRole();
      if (!managerRole) {
        return { error: { message: 'Manager role not found.' } };
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const roleIdOfManager = managerRole.id;

      const newManager = await ManagerRepository.createManager(name, phone, branch);
      const createdUser = await ManagerRepository.createUser(email, hashPassword, roleIdOfManager, newManager.id);

      return { ManagerData: newManager };
    } catch (error) {
      console.error('Error registering manager:', error);
      return { error: 'Server error' };
    }
  },

  async get_all_managers() {
    return await ManagerRepository.findAllManagers();
  },

  async get_manager_by_id(id) {
    return await ManagerRepository.findManagerById(id);
  },

  async edit_manager_by_id(id, data) {
    const filteredData = { ...data };
    delete filteredData.password;
    delete filteredData.email;

    return await ManagerRepository.updateManagerById(id, filteredData);
  },

  async delete_manager_by_id(id) {
    return await ManagerRepository.deleteManagerById(id);
  },
};

module.exports = ManagerService;
