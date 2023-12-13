const { DataTypes } = require("sequelize");
const sequelize = require("../config/crm_database");
const Roles = require("./Roles");
const Customers = require("./Customers");
const SalesRepresentative = require("./SalesRepresentative");
const Manager = require("./Manager");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RoleID: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: Roles,
      key: "id",
    },
  },
  CustomerId: {
    type: DataTypes.INTEGER,
    allowNull: true, // user might not always have a customer association
    references: {
      model: Customers,
      key: "id",
    },
  },
  SalesRepresentativeId: {
    type: DataTypes.INTEGER,
    allowNull: true, // user might not always have a sales representative association
    references: {
      model: SalesRepresentative,
      key: "id",
    },
  },
  ManagerId: {
    type: DataTypes.INTEGER,
    allowNull: true, // user might not always have a manager association
    references: {
      model: Manager,
      key: "id",
    },
  },
});

Users.belongsTo(Roles, { foreignKey: "RoleID" });
Users.belongsTo(Customers, { foreignKey: "CustomerId" });
Users.belongsTo(SalesRepresentative, { foreignKey: "SalesRepresentativeId" });
Users.belongsTo(Manager, { foreignKey: "ManagerId" });

module.exports = Users;
