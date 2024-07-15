import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from "../models/Account.js";


export const generateToken = (user) => {
    return jwt.sign({ id: user._id, name:user.name, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });
  };


  export const registerUser = async (name, email, password) => {
    try {
      // Verificar se o usuário já existe
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Usuário nao existe');
      }
  
      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Criar novo usuário
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      // Gerar token JWT
      const token = generateToken(newUser);
  
      return { user: newUser, token };
    } catch (error) {
      throw error;
    }
  };

  export const getAllUsers = async () => {
    try {
      const users = await User.find().select('-password');
      return users;
    } catch (error) {
      throw error;
    }
  };


  export const loginUser = async (email, password) => {
    try {
      // Verificar se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Credenciais inválidas');
      }
  
      // Verificar a senha
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Credenciais inválidas');
      }
  
      // Gerar token JWT
      const token = generateToken(user);
  
      return { user, token };
    } catch (error) {
      throw error;
    }
  };
  
  // Obter dados do usuário por ID
  export const getUserById = async (userId) => {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  // Atualizar dados do usuário
  export const updateUser = async (userId, updatedFields) => {
    try {
      // Encontrar usuário pelo ID e atualizar campos
      const user = await User.findByIdAndUpdate(userId, updatedFields, {
        new: true,
        runValidators: true,
      }).select('-password');
  
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  };


  export const getAllUsersWithAccounts = async () => {
    try {
      const users = await User.find().select('-password');
      const populatedUsers = await Promise.all(users.map(async (user) => {
        const accounts = await Account.find({ user: user._id });
        return {
          ...user.toJSON(),
          accounts: accounts.map(account => account.toJSON())
        };
      }));
      return populatedUsers;
    } catch (error) {
      throw error;
    }
  };