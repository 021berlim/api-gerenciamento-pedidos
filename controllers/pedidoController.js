const { Pedido, Cliente, Produto, ItemPedido } = require("../models");

exports.createPedido = async (req, res) => {
  try {
    const { cliente_id, itens } = req.body;

    const cliente = await Cliente.findByPk(cliente_id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Criar o novo pedido
    const novoPedido = await Pedido.create({
      cliente_id,
      status: "Em preparo",
      data: new Date(),
    });

    // Adicionar os itens ao pedido
    const itensCriados = [];
    for (let item of itens) {
      const produto = await Produto.findByPk(item.produto_id);
      if (!produto) {
        return res
          .status(404)
          .json({ error: `Produto com ID ${item.produto_id} não encontrado` });
      }

      const itemPedido = await ItemPedido.create({
        pedido_id: novoPedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario,
      });

      itensCriados.push(itemPedido);
    }

    // Buscar o pedido com seus itens e produtos associados
    const pedidoComItens = await Pedido.findOne({
      where: { id: novoPedido.id },
      include: [
        {
          model: ItemPedido,
          include: {
            model: Produto,
            attributes: ["nome", "preco"],
          },
        },
      ],
    });

    res.status(201).json(pedidoComItens);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res
      .status(500)
      .json({ error: "Erro ao criar pedido", details: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusPermitidos = ["Em preparo", "Pronto", "Entregue"];
    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    pedido.status = status;
    await pedido.save();

    res.status(200).json({ message: "Status atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar status do pedido" });
  }
};

exports.listByCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidos = await Pedido.findAll({
      where: { cliente_id: id },
      attributes: ["id", "status", "data"],
    });

    if (pedidos.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum pedido encontrado para este cliente" });
    }

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pedidos do cliente" });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findOne({
      where: { id },
      include: [
        {
          model: Cliente,
          attributes: ["nome"],
        },
        {
          model: ItemPedido,
          include: [
            {
              model: Produto,
              attributes: ["nome", "preco"],
            },
          ],
          attributes: ["quantidade", "preco_unitario"],
        },
      ],
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Erro ao buscar detalhes do pedido",
        details: error.message,
      });
  }
};
