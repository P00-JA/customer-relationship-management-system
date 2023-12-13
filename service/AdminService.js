const bcrypt = require('bcrypt');
const AdminRepository = require('../repository/AdminRepository');

const AdminService = {
  async insert_admin(email, password) {
    try {
      const existingUser = await AdminRepository.findUserByEmail(email);
      if (existingUser) {
        return { error: { message: 'Admin already exists!' } };
      }

      const adminRole = await AdminRepository.findAdminRole();
      if (!adminRole) {
        return { error: { message: 'Admin role not found.' } };
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const roleIdOfAdmin = adminRole.id;

      const createdAdmin = await AdminRepository.createUser(email, hashPassword, roleIdOfAdmin);
      return { message: 'Admin added successfully' };
    } catch (error) {
      console.error('Error registering user:', error);
      return { error: 'Server error' };
    }
  }
};

module.exports = AdminService;
