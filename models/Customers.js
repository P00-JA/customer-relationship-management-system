const { DataTypes, Transaction } = require("sequelize");
const sequelize = require("../config/crm_database");
const Users = require("./Users");
const SalesRepresentative = require("./SalesRepresentative");

const Customers = sequelize.define("Customers", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { args: true, msg: "You must enter a Phone Number" },
      len: { args: [10, 10], msg: 'Phone Number should be 11 digits' },
      isNumeric: { args: true, msg: "Phone Number should contain only numbers" },
    },
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CreatedBy_SalesRepresentative: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UpdatedBy: { 
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Customers;
