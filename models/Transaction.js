const { DataTypes } = require("sequelize");
const sequelize = require("../config/crm_database");
const Users = require('./Users');

const Transaction = sequelize.define("Transaction", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  deal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

Transaction.hasMany(Users, {
  as: 'user_transaction',
  foreignKey: 'TransactionBy',
  allowNull: true,
});
Users.belongsTo(Transaction);


module.exports = Transaction;
