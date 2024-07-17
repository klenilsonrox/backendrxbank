import Account from '../models/Account.js';
import User from '../models/User.js';

// Criar uma conta se não existir para um usuário com o email especificado
export const createAccountIfNotExists = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`usuário com o email ${email} não encontrado`);
    }

    const existingAccount = await Account.findOne({ user: user._id });
    if (existingAccount) {
      return existingAccount; // Retorna a conta existente se já houver uma
    }

    const newAccount = new Account({
      user: user._id,
    });

    await newAccount.save();

    return newAccount;
  } catch (error) {
    throw error;
  }
};

// Obter conta pelo email do usuário
export const getAccountByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`usuário com o email ${email} não encontrado`);
    }

    const account = await Account.findOne({ user: user._id });
    if (!account) {
      throw new Error(`Conta não encontrada para o email usuário com o email ${email}`);
    }

    return account;
  } catch (error) {
    throw error;
  }
};

// Depositar em uma conta pelo email do usuário
export const depositByEmail = async (email, amount) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`usuário com o email ${email} não encontrado`);
    }

    const account = await Account.findOne({ user: user._id });
    if (!account) {
      throw new Error(`Conta não encontrada para o email usuário com o email ${email}`);
    }

    account.balance += amount;
    await account.save();

    return account;
  } catch (error) {
    throw error;
  }
};

// Transferir entre contas pelo email dos usuários
export const transferByEmail = async (fromEmail, toEmail, amount) => {

  if(amount <=0){
    throw new Error("O valor deve ser maior que 0")
  }

  try {
    const fromUser = await User.findOne({ email: fromEmail });
    const toUser = await User.findOne({ email: toEmail });

    if (!fromUser) {
      throw new Error(`usuário com o ${fromEmail} nao encontrado`);
    }
    if (!toUser) {
      throw new Error(`destinátario ${toEmail} nao encontrado`);
    }


  
    const fromAccount = await Account.findOne({ user: fromUser._id });
    const toAccount = await Account.findOne({ user: toUser._id });

    if (!fromAccount) {
      throw new Error(`Conta do remetente não encontrada para usuário com o email${fromEmail}`);
    }
    if (!toAccount) {
      throw new Error(`Conta de destinatário não encontrada para usuário com o email ${toEmail}`);
    }

    if (fromAccount.balance < amount || fromAccount.balance < 0) {
      throw new Error('Saldo insuficiente');
    }



    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save();
    await toAccount.save();

    return { fromAccount, toAccount };
  } catch (error) {
    throw error;
  }
};


export const getAllAccounts = async () => {
  try {
    const accounts = await Account.find().populate('user', 'name email');
    return accounts;
  } catch (error) {
    throw error;
  }
};




