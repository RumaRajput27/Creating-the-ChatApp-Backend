const { DataTypes } = require("sequelize");
const sequelize = require("../db/db-config");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures usernames are unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures emails are unique
      validate: {
        isEmail: true, // Validates that the field is a valid email format
      },
    },
    phone: {
      type: DataTypes.STRING, // Use STRING to support international formats
      allowNull: false,
      validate: {
        isNumeric: true, // Ensures the field contains only numeric values
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
    paranoid: true, // Enables soft deletes with a `deletedAt` field
  }
);

// Hook to hash the password before saving the user to the database
// User.beforeCreate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 10);
// }


// );

module.exports = User;
