import express from 'express';
import transactionController from '../controllers/transactionsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

// Endpoint para criar uma transação
router.post('/transactions', authMiddleware, transactionController.createTransaction);

// Endpoint para buscar transações de um usuário específico
router.get('/transactions/:userId',authMiddleware, transactionController.getTransactionsByUser);

// Endpoint para buscar todas as transações
router.get('/transactions', authMiddleware, transactionController.getAllTransactions);

export default router;
