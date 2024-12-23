const { DataTypes } = require("sequelize");
const sequelize = require("../db/db-config");
const User = require("./userModel");

const UsersChat = sequelize.define("UsersChat", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UsersChat.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
User.hasMany(UsersChat, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

module.exports = UsersChat;
