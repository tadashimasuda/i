'use strict';
module.exports = (sequelize, DataTypes) => {
  const purchases = sequelize.define('purchases', {
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  purchases.associate = function(models) {
    // associations can be defined here
    //外部キーとの連携
    purchases.belongsTo(models.products, {
      foreignKey: 'product_id'
    });
    purchases.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
  };
  return purchases;
};