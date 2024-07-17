import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { createAccountIfNotExists,getAccountByEmail,depositByEmail,transferByEmail, getAllAccounts } from "../services/accountServices.js";
import { createContactService } from "../services/contactService.js";



// Controller para criar uma conta se não existir para um usuário com o email especificado
export const createAccountIfNotExistsController = async (req, res) => {
  const { email } = req.user;

  try {
    const account = await createAccountIfNotExists(email);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller para obter a conta pelo email do usuário
export const getAccountByEmailController = async (req, res) => {
  const { email } = req.user;

  try {
    const account = await getAccountByEmail(email);
    res.status(200).json(account);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Controller para depositar em uma conta pelo email do usuário
export const depositByEmailController = async (req, res) => {
  const { email,_id} = req.user;
  const {amount} = req.body

  try {

    const account = await depositByEmail(email, amount);

    

     await Transaction.create({
      to:_id.toString(),
      amount,
      type:"indicacao"

    })



    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Controller para transferir entre contas pelo email dos usuários
export const transferByEmailController = async (req, res) => {
  const { toEmail, amount } = req.body;
const fromEmail = req.user.email
const {_id} = req.user

let userRef = _id
let email = toEmail

  try {
    if(fromEmail===toEmail){
      throw new Error("você não pode transferir para você mesmo")
   }

   const userExist = await User.findOne({email})

   if(userExist){
     await createContactService(userRef,email)
   }

    const result = await transferByEmail(fromEmail, toEmail, amount);

    // await Transaction.create({
    //   to:_id.toString(),
    //   amount,
    //   type:"transferencia"

    // })

    const {toAccount}= result
    const {fromAccount} = result
    let de = fromAccount.user.toString()
    let para = toAccount.user.toString()

    const transacoes = await Transaction.create({
      from:de,
      to:para,
      amount,
      type:"transferencia"
    })

  

    res.status(200).json({result, transacoes,message:"Transferência realizada com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllAccountsController = async (req, res) => {
    try {
      const accounts = await getAllAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
