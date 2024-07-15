import mongoose from "mongoose";

const mongo_Url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@digitalbank.ztq73oc.mongodb.net/`


export async function connectDB(){
    try {
        await mongoose.connect(mongo_Url)
        console.log(`conectado ao banco de dados com sucesso`)
    } catch (error) {
        console.log(error.message)
    }
}