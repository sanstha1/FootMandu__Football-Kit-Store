import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Product = sequelize.define("product", {
  productId: {
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
    await Product.sync();
    console.log("The Product table has been created or updated");
  } catch (error) {
    console.error("Error syncing the Product model:", error.message);
  }
})();
