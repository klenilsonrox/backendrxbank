import { model, Schema } from "mongoose";


const contatoSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userRef: {
    type: String,
    default: false,
  }
});

const Contato = model('Contato', contatoSchema);
export default Contato;
