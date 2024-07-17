import { deleteContactService, getAllcontactService,updateContactService  } from "../services/contactService.js"

export const deleteContactController= async (req,res)=>{
    const {id} = req.params
    try {
        await deleteContactService(id)
        return res.status(200).json({message:"contato deletado com sucesso!!"})
    } catch (error) {
        
    }
}



export const getContactsController= async (req,res)=>{
    try {
        const contatos = await getAllcontactService()
        return res.status(200).json(contatos)
    } catch (error) {
        
    }
}

export const updateContactsController= async (req,res)=>{
    const {id}= req.params
    const {email}= req.body
    try {
        
        const contato = await updateContactService(id,{email})
        return res.status(201).json(contato)
    } catch (error) {
        
    }
}


