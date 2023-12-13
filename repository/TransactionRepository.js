const Transaction = require("../models/Transaction");
const User = require("../models/Users");
const Customer = require("../models/Customers");
const { sequelize } = require("../config/crm_database");

const TransactionRepository = {
  async createTransaction(deal, amount, date, userId) {
    return await Transaction.create({
      deal,
      transaction_amount: amount,
      transaction_date: date,
      UserId: userId,
    });
  },

  async findAllCustomerTransactions(customerId) {
    return await Transaction.findAll({
      where: { UserId: customerId },
    });
  },

  async findAllSalesRepTransactions(salesRepId) {
    return await Transaction.findAll({
      include: [
        {
          model: User,
          as: "user_transaction",
          where: { SalesRepresentativeId: salesRepId },
        },
      ],
    });
  },

  async findJoinedCustomersAndDeal() {
    return await Transaction.findAll({
      include: [
        {
          model: User,
          as: "user_transaction",
          include: [
            {
              model: Customer,
              attributes: ["id", "name", "phone", "branch"],
            },
          ],
        },
      ],
    });
  },

  async findMonthlyCustomerTransactions(customerId, month, year) {
    return await sequelize.query(
      `SELECT * FROM "Transactions"
       INNER JOIN "Users" ON "Transactions"."UserId" = "Users"."id"
       WHERE "Transactions"."UserId" = :customerId
       AND EXTRACT(MONTH FROM "Transactions"."transaction_date") = :month
       AND EXTRACT(YEAR FROM "Transactions"."transaction_date") = :year`,
      {
        replacements: { customerId, month, year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
  },

  async findMonthlySalesRepTransactions(salesRepId, month, year) {
    return await sequelize.query(
      `SELECT * FROM "Transactions"
       INNER JOIN "Users" ON "Transactions"."UserId" = "Users"."id"
       WHERE "Users"."SalesRepresentativeId" = :salesRepId
       AND EXTRACT(MONTH FROM "Transactions"."transaction_date") = :month
       AND EXTRACT(YEAR FROM "Transactions"."transaction_date") = :year`,
      {
        replacements: { salesRepId, month, year },
        type: sequelize.QueryTypes.SELECT,
      }
    );
  },
};

module.exports = TransactionRepository;
