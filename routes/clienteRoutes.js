const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// router.get('/', (req, res) => {
//   res.status(200).json({ message: 'Rota de usuário funcionando!' });
// });

router.post('/',clienteController.createCliente);
router.get('/', clienteController.getAllClientes);
router.get('/:id', clienteController.getClienteById);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
