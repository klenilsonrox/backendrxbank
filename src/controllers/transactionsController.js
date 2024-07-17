import transactionService from '../services/transactionServices.js';

const transactionController = {
  async createTransaction(req, res) {
    const {to, amount, type } = req.body;

    let from = req.user.email

  

    try {

         if(from===to){
    return res.status(403).json({message:"você não pode transferir para voce mesmo"})
   }

      // Validações podem ser adicionadas aqui usando validationResult(req)
      const transaction = await transactionService.createTransaction(from, to, amount, type);
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Erro ao criar transação:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async getTransactionsByUser(req, res) {
    const userId= req.user._id.toString()

 

    try {
      
      const transactions =await transactionService.getTransactionsByUser(userId);
      
      res.json(transactions);
    } catch (error) {
      console.error('Erro ao buscar transações do usuário:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async getAllTransactions(req, res) {
    try {
      const transactions = await transactionService.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      console.error('Erro ao buscar todas as transações:', error.message);
      res.status(400).json({ error: error.message });
    }
  },


};

export default transactionController;
