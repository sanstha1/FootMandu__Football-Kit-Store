import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

(async () => {
  try {
    await User.sync();
    console.log("The User table has been created or updated");
  } catch (error) {
    console.error("Error syncing the Users model:", error.message);
  }
})();


