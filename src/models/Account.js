import mongoose from 'mongoose';

const { Schema } = mongoose;

const accountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: 500, // Saldo inicial padrão de 5.000 reais
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model('Account', accountSchema);
export default Account;
