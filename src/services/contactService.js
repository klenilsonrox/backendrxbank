import Contato from "../models/Contato.js"

export async function createContactService(userRef,email){
    let contact = await Contato.findOne({ userRef, email });

    if (!contact) {
        contact = await Contato.create({ userRef, email });
    }

    return contact;
}

export async function getAllcontactService(){
    const contatos = await Contato.find()
    return contatos
}

export async function getAllcontactOneUserService(userRef){
    const contatos = await Contato.findOne({userRef})
    return contatos
}

export async function deleteContactService(id) {
   return await Contato.findByIdAndDelete(id);
}

export async function findContactByIdService(id) {
    const contact = await Contato.findById(id);
    return contact;
}

export async function updateContactService(id, updateData) {
    const updatedContact = await Contato.findByIdAndUpdate(id, updateData, { new: true });
    return updatedContact;
}
