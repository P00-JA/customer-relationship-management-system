const TransactionRepository = require('../repository/TransactionRepository');
const User = require('../models/Users');

const TransactionService = {
  async customerAddedTransaction(userId, deal, amount, date) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return { error: 'User not found' };
      }

      const newTransaction = await TransactionRepository.createTransaction(
        deal,
        amount,
        date,
        userId
      );

      return { newTransaction };
    } catch (error) {
      return { error: error.message };
    }
  },

  async salesRepAddedTransaction(userId, deal, amount, date) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return { error: 'User not found' };
      }

      const newTransaction = await TransactionRepository.createTransaction(
        deal,
        amount,
        date,
        userId
      );

      return { newTransaction };
    } catch (error) {
      return { error: error.message };
    }
  },

  async customerTransaction(customerId) {
    try {
      const customerTransactions = await TransactionRepository.findAllCustomerTransactions(
        customerId
      );

      return { customerTransactions };
    } catch (error) {
      return { error: error.message };
    }
  },

  async salesRepTransaction(salesRepId) {
    try {
      const salesRepTransactions = await TransactionRepository.findAllSalesRepTransactions(
        salesRepId
      );

      return { salesRepTransactions };
    } catch (error) {
      return { error: error.message };
    }
  },

  async joinCustomersAndDeal() {
    try {
      const transactions = await TransactionRepository.findJoinedCustomersAndDeal();
      return { transactions };
    } catch (error) {
      return { error: error.message };
    }
  },

  async monthlyCustomerTransaction(customerId, month, year) {
    try {
      const customerTransactions = await TransactionRepository.findMonthlyCustomerTransactions(
        customerId,
        month,
        year
      );

      return { customerTransactions };
    } catch (error) {
      return { error: error.message };
    }
  },

  async monthlySalesRepTransaction(salesRepId, month, year) {
    try {
      const salesRepTransactions = await TransactionRepository.findMonthlySalesRepTransactions(
        salesRepId,
        month,
        year
      );

      return { salesRepTransactions };
    } catch (error) {
      return { error: error.message };
    }
  },
};

module.exports = TransactionService;
