const AdminService = require('../service/AdminService');

const AdminController = {
  async insertAdmin(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const result = await AdminService.insert_admin(email, password);

      if (result.error) {
        return res.status(409).json({ errors: result.error });
      }

      res.json({ message: result.message });
    } catch (error) {
      console.error('Error registering admin:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = AdminController;
