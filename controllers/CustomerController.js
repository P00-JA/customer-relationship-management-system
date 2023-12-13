const CustomerService = require('../service/CustomerService');

const CustomerController = {
  async insertNewCustomer(req, res) {
    try {
      const { name, email, password, phone, branch, CreatedBy_SalesRepresentative } = req.body;
      const result = await CustomerService.insert_new_customer(
        name,
        email,
        password,
        phone,
        branch,
        CreatedBy_SalesRepresentative
      );

      if (result.error) {
        return res.status(409).json({ errors: result.error });
      }

      res.json(result);
    } catch (error) {
      console.error('Error registering customer:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getAllCustomers(req, res) {
    const customers = await CustomerService.get_all_customers();
    if (customers && customers.length > 0) {
      return res.json(customers);
    } else {
      res.json({ error: { message: 'no customers inserted yet!' } });
    }
  },

  async getCustomerById(req, res) {
    const customerId = req.params.id;
    const customer = await CustomerService.get_customer_by_id(customerId);
    if (!customer) {
      res.status(404).json({ errors: { message: 'customer not found' } });
    } else {
      res.json({ 'CustomerData': customer });
    }
  },

  async editCustomerById(req, res) {
    const customerId = req.params.id;
    const dataToUpdate = req.body;

    const result = await CustomerService.edit_customer_by_id(customerId, dataToUpdate);
    if (result) {
      res.status(200).json({
        message: 'customer updated successfully',
        customer: result,
      });
    } else {
      res.status(404).json({ errors: { message: 'customer not found' } });
    }
  },

  async deleteCustomerById(req, res) {
    const customerId = req.params.id;
    const result = await CustomerService.delete_customer_by_id(customerId);

    if (result) {
      res.status(200).json({ message: 'customer deleted successfully' });
    } else {
      res.status(404).json({ errors: { message: 'customer not found' } });
    }
  },
};

module.exports = CustomerController;
