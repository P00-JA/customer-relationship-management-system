const SalesRepresentativeService = require('../service/SalesRepresentativeService');

const SalesRepresentativeController = {
  async insertNewSalesRepresentative(req, res) {
    try {
      const { name, email, password, phone, branch, CreatedBy_Manager } = req.body;
      const result = await SalesRepresentativeService.insert_new_sales_representative(
        name,
        email,
        password,
        phone,
        branch,
        CreatedBy_Manager
      );

      if (result.error) {
        return res.status(409).json({ errors: result.error });
      }

      res.json(result);
    } catch (error) {
      console.error('Error registering sales representative:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getAllSalesRepresentative(req, res) {
    const salesReps = await SalesRepresentativeService.get_all_sales_representatives();
    if (salesReps && salesReps.length > 0) {
      return res.json(salesReps);
    } else {
      res.json({ error: { message: 'no sales representatives inserted yet!' } });
    }
  },

  async getSalesRepresentativeById(req, res) {
    const salesRepId = req.params.id;
    const salesRep = await SalesRepresentativeService.get_sales_representative_by_id(salesRepId);
    if (!salesRep) {
      res.status(404).json({ errors: { message: 'sales representative not found' } });
    } else {
      res.json({ 'SalesRepresentative Data': salesRep });
    }
  },

  async editSalesRepresentativeById(req, res) {
    const salesRepId = req.params.id;
    const dataToUpdate = req.body;

    const result = await SalesRepresentativeService.edit_sales_representative_by_id(salesRepId, dataToUpdate);
    if (result) {
      res.status(200).json({
        message: 'sales representative updated successfully',
        salesRep: result,
      });
    } else {
      res.status(404).json({ errors: { message: 'sales representative not found' } });
    }
  },

  async deleteSalesRepresentativeById(req, res) {
    const salesRepId = req.params.id;
    const result = await SalesRepresentativeService.delete_sales_representative_by_id(salesRepId);

    if (result) {
      res.status(200).json({ message: 'sales representative deleted successfully' });
    } else {
      res.status(404).json({ errors: { message: 'sales representative not found' } });
    }
  },
};

module.exports = SalesRepresentativeController;
