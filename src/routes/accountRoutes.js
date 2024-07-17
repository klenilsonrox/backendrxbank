import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import { createAccountIfNotExistsController, depositByEmailController, getAccountByEmailController, getAllAccountsController, transferByEmailController } from '../controllers/accountController.js';
import { verifyUserAdmin } from '../middlewares/verifyUserAdmin.js';


const router = express.Router();

// Rota para buscar todas as contas de usuário
router.get('/all', authMiddleware, verifyUserAdmin, getAllAccountsController);

// Rota para criar uma conta se não existir para um usuário com o email especificado
router.post('/account', authMiddleware, createAccountIfNotExistsController);

// Rota para obter a conta pelo email do usuário
router.get('/account/email', authMiddleware, getAccountByEmailController);

// Rota para depositar em uma conta pelo email do usuário
router.post('/account/deposit', authMiddleware, verifyUserAdmin, depositByEmailController);

// Rota para transferir entre contas pelo email dos usuários
router.post('/account/transfer', authMiddleware, transferByEmailController);

export default router;
