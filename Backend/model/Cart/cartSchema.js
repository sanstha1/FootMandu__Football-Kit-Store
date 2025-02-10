import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Cart = sequelize.define("cart", {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, 
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: false, 
    },
  },
});

(async () => {
  try {
    await Cart.sync();
    console.log("The Cart table has been created or updated");
  } catch (error) {
    console.error("Error syncing the Cart model:", error.message);
  }
})();
