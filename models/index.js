const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Produto = require('./Produto');
const Pedido = require('./Pedido');
const ItemPedido = require('./ItemPedido');

module.exports = {
  sequelize,
  Cliente,
  Produto,
  Pedido,
  ItemPedido,
};

ItemPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Pedido.hasMany(ItemPedido, { foreignKey: 'pedido_id' });

ItemPedido.belongsTo(Produto, { foreignKey: 'produto_id' });
Produto.hasMany(ItemPedido, { foreignKey: 'produto_id' });

Cliente.hasMany(Pedido, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });

Produto.hasMany(ItemPedido, { foreignKey: 'produto_id' });
ItemPedido.belongsTo(Produto, { foreignKey: 'produto_id' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedido_id' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });

Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id' });

// Código abaixo comentado para evitar a criação de tabelas repetidamente

// async function criarTabelas() {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('Tabelas criadas com sucesso!');
//   } catch (err) {
//     console.error('Erro ao criar tabelas:', err);
//   } finally {
//     await sequelize.close();
//   }
// }

// criarTabelas();
