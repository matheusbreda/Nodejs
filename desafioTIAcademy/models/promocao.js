'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promocao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promocao.belongsTo(models.Empresa,
        {foreignKey: 'EmpresaId', as: 'empresa_promocao'});
      Promocao.belongsToMany(models.Promocao,
        {foreignKey: 'CartaoId', through: 'Compra', as: 'cartao_promocao'});
      Promocao.hasMany(models.Compra,
        {foreignKey: 'PromocaoId', as: 'promocao_compra'});
    }
  }
  Promocao.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    validade: DataTypes.DATEONLY,
    EmpresaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Promocao',
  });
  return Promocao;
};