const { DataTypes } = require("sequelize");
const sequelize = require("../config/crm_database");

const SalesRepresentative = sequelize.define("SalesRepresentative", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
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
      len: { args: [10, 10], msg: 'Phone Number should be 10 digits' },
      isNumeric: { args: true, msg: "Phone Number should contain only numbers" },
    },
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = SalesRepresentative;

