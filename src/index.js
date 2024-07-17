import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routerAccounts from './routes/accountRoutes.js';
import routerUsers from './routes/userRoutes.js';
import routerTransactions from './routes/transactionRoutes.js';
import routerContact from './routes/contactRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import { connectDB } from './database/connectDB.js';
import { WebSocketServer } from 'ws';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authMiddleware, routerUsers);
app.use('/api', authMiddleware, routerAccounts);
app.use('/api', authMiddleware, routerTransactions);
app.use('/api', authMiddleware, routerContact);

const port = process.env.PORT || 4000;

// Configurar o servidor WebSocket
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
});

async function startServer() {
  await connectDB();

  const db = mongoose.connection;

  // Detectar mudanças no MongoDB
  const changeStream = db.collection('suacolecao').watch();

  changeStream.on('change', (change) => {
    console.log('Mudança detectada:', change);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(change));
      }
    });
  });

  const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
}

startServer();
