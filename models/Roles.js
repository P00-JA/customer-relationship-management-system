const { DataTypes } = require("sequelize");
const sequelize = require("../config/crm_database");

const Roles = sequelize.define("Roles", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Roles;
