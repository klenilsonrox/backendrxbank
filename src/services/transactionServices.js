import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import Account from '../models/Account.js';

const transactionService = {
  async createTransaction(fromEmail, toEmail, amount, type) {
    try {
      // Busca usuários pelo e-mail
      const fromUser = await User.findOne({ email: fromEmail });
      const toUser = await User.findOne({ email: toEmail });

      if (!fromUser || !toUser) {
        throw new Error('Usuário(s) não encontrado(s)');
      }

      // Verifica se o usuário de origem tem saldo suficiente
      const fromUserAccount = await Account.findOne({ user: fromUser._id });
      if (!fromUserAccount || fromUserAccount.balance < amount) {
        throw new Error('Saldo insuficiente para transferência');
      }

      // Cria a transação de transferência  
      const transaction = new Transaction({
        from: fromUser._id,
        to: toUser._id,
        amount,
        type,
      });

      // Atualiza os saldos nas contas dos usuários
      fromUserAccount.balance -= amount;
      await fromUserAccount.save();

      const toUserAccount = await Account.findOne({ user: toUser._id });
      toUserAccount.balance += amount;
      await toUserAccount.save();

      await transaction.save();
      return transaction;
    } catch (error) {
      throw error;
    }
  },

  async getTransactionsByUser(userId) {
    try {
      const transactions = await Transaction.find({ $or: [{ from: userId }, { to: userId }] })
        .populate('from', 'name email') // Popula os detalhes do usuário que enviou a transação
        .populate('to', 'name email');   // Popula os detalhes do usuário que recebeu a transação
  
      return transactions;
    } catch (error) {
      throw error;
    }
  },

  async getAllTransactions() {
    try {
      // Busca todas as transações e popula os campos 'from' e 'to' com os documentos de usuário correspondentes
      const transactions = await Transaction.find()
        .populate('from', 'name email')  // Popula com nome e email do remetente
        .populate('to', 'name email');   // Popula com nome e email do destinatário
      return transactions;
    } catch (error) {
      throw error;
    }
  },
};

export default transactionService;
