'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compra.belongsTo(models.Cartao,
        {foreignKey: "CartaoId", as: 'compra_cartao'});
      Compra.belongsTo(models.Promocao,
        {foreignKey: "PromocaoId", as: 'compra_promocao'});
    }
  }
  Compra.init({
    data: DataTypes.DATEONLY,
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    PromocaoId: DataTypes.INTEGER,
    CartaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};