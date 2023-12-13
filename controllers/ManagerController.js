const ManagerService = require('../service/ManagerService');

const ManagerController = {
  async insertNewManager(req, res) {
    try {
      const { name, email, password, phone, branch } = req.body;
      const result = await ManagerService.insert_new_manager(name, email, password, phone, branch);

      if (result.error) {
        return res.status(409).json({ errors: result.error });
      }

      res.json(result);
    } catch (error) {
      console.error('Error registering manager:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getAllManager(req, res) {
    const managers = await ManagerService.get_all_managers();
    if (managers && managers.length > 0) {
      return res.json(managers);
    } else {
      res.json({ error: { message: 'no managers inserted yet!' } });
    }
  },

  async getManagerById(req, res) {
    const managerId = req.params.id;
    const manager = await ManagerService.get_manager_by_id(managerId);
    if (!manager) {
      res.status(404).json({ errors: { message: 'manager not found' } });
    } else {
      res.json({ ManagerData: manager });
    }
  },

  async editManagerById(req, res) {
    const managerId = req.params.id;
    const dataToUpdate = req.body;

    const result = await ManagerService.edit_manager_by_id(managerId, dataToUpdate);
    if (result) {
      res.status(200).json({ message: 'manager updated successfully' });
    } else {
      res.status(404).json({ errors: { message: 'manager not found' } });
    }
  },

  async deleteManagerById(req, res) {
    const managerId = req.params.id;
    const result = await ManagerService.delete_manager_by_id(managerId);

    if (result) {
      res.status(200).json({ message: 'manager deleted successfully' });
    } else {
      res.status(404).json({ errors: { message: 'manager not found' } });
    }
  },
};

module.exports = ManagerController;
