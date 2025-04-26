const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.createPedido);
router.patch('/:id/status', pedidoController.updateStatus);
router.get('/clientes/:id/pedidos', pedidoController.listByCliente);
router.get('/:id', pedidoController.show);

module.exports = router;
