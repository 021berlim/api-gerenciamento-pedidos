const { Produto } = require("../models");

exports.getAllProdutos = async (req, res) => {
  try {
    const produto = await Produto.findAll();
    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar os produtos:", error);
    res.status(500).json({ error: "Erro ao buscar os produtos" });
  }
};

exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    const novoProduto = await Produto.create({ nome, descricao, preco });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
};
