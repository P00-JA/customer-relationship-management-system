const { DataTypes } = require("sequelize");
const sequelize = require("../config/crm_database");
const SalesRepresentative = require("./SalesRepresentative");

const Manager = sequelize.define("Manager", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          args: true,
          msg: "Required"
     },
     is: {
         args: ["^[a-z]+$", 'i'],
         msg: "Only letters allowed"
     },
     len: {
         args: [4,32],
         msg: "String length is not in this range"
     }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { args: true, msg: "You must enter a Phone Number" },
      len: { args: [10, 10], msg: 'Phone Number should be 10 digits' },
      isNumeric: { args: true, msg: "Phone Number should contain only numbers" },
    }
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


Manager.hasMany(SalesRepresentative,{
  foreignKey: "CreatedBy_Manager:"
});

Manager.hasMany(SalesRepresentative,{
  foreignKey: "UpdatedBy_Manager:"
});

//SalesRepresentative.belongsTo(Manager);

module.exports = Manager;
