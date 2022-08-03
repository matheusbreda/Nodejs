'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cartao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cartao.belongsTo(models.Cliente,
        {foreignKey: 'ClienteId', as: 'cliente_pedido'});
      Cartao.belongsToMany(models.Promocao,
        {foreignKey: 'PromocaoId', through: 'Compra', as: 'promocao_cartao'});
      Cartao.hasMany(models.Compra,
        {foreignKey: 'CartaoId', as: 'cartao_compra'});
    }
  }
  Cartao.init({
    dataCartao: DataTypes.DATEONLY,
    validade: DataTypes.DATEONLY,
    ClienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cartao',
  });
  return Cartao;
};