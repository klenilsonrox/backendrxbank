import User from "../models/User.js";
import { createAccountIfNotExists } from "../services/accountServices.js";
import { generateToken, getAllUsers, getAllUsersWithAccounts, getUserById, loginUser, registerUser, updateUser } from "../services/userServices.js";
import bcrypt from "bcryptjs"

// Registrar novo usuário
export const registerUserController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const { user, token } = await registerUser(name, email, password);

      await createAccountIfNotExists(user.email)

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Login de usuário
  export const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {

      const usuario = await User.findOne({ email }); 
      if (!usuario) {
       return res.status(401).json({message:"Usuário não cadastrado"})
      }

      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        throw new Error('Credenciais inválidas');
      }

      const token =  generateToken(usuario)

      // const { user, token } = await loginUser(email, password);
      res.status(200).json({ usuario, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Listar todos os usuários
export const getAllUsersController = async (req, res) => {
  try {

    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  // Obter dados do usuário autenticado
  export const getUserController = async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Atualizar dados do usuário
  export const updateUserController = async (req, res) => {
    const userId = req.user.id;
    const updatedFields = req.body;
    try {
      const user = await updateUser(userId, updatedFields);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  export const getAllUsersWithAccountsController = async (req, res) => {
    try {
      const users = await getAllUsersWithAccounts();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

