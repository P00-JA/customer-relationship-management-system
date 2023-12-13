const TransactionService = require("../service/TransactionService");

const TransactionController = {
  async customerAddedTransaction(req, res) {
    try {
      const { userId, deal, amount, date } = req.body;
      const result = await TransactionService.customerAddedTransaction(
        userId,
        deal,
        amount,
        date
      );

      if (result.error) {
        return res.status(404).json({ error: result.error });
      }

      res.status(201).json(result.newTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async salesRepAddedTransaction(req, res) {
    try {
      const { userId, deal, amount, date } = req.body;
      const result = await TransactionService.salesRepAddedTransaction(
        userId,
        deal,
        amount,
        date
      );

      if (result.error) {
        return res.status(404).json({ error: result.error });
      }

      res.status(201).json(result.newTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async customerTransaction(req, res) {
    try {
      const { customerId } = req.params;
      const result = await TransactionService.customerTransaction(customerId);

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }

      res.json(result.customerTransactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async salesRepTransaction(req, res) {
    try {
      const { salesRepId } = req.params;
      const result = await TransactionService.salesRepTransaction(salesRepId);

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }

      res.json(result.salesRepTransactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async joinCustomersAndDeal(req, res) {
    try {
      const result = await TransactionService.joinCustomersAndDeal();

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }

      res.json(result.transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async monthlyCustomerTransaction(req, res) {
    try {
      const { customerId, month, year } = req.params;
      const result = await TransactionService.monthlyCustomerTransaction(
        customerId,
        month,
        year
      );

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }

      res.json(result.customerTransactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async monthlySalesRepTransaction(req, res) {
    try {
      const { salesRepId, month, year } = req.params;
      const result = await TransactionService.monthlySalesRepTransaction(
        salesRepId,
        month,
        year
      );

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }

      res.json(result.salesRepTransactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = TransactionController;
