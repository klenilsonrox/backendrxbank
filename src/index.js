import express from "express"
import cors from "cors"
import { connectDB } from "./database/connectDB.js"
import routerAccounts from "./routes/accountRoutes.js"
import routerUsers from "./routes/userRoutes.js"
import routerRoutes from "./routes/transactionRoutes.js"
import routerTransactions from "./routes/transactionRoutes.js"



const app = express()
app.use(express.json())
app.use(cors())

app.use("/api", routerUsers)
app.use("/api", routerAccounts)
app.use("/api", routerRoutes)
app.use("/api", routerTransactions)





connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`servidor rodando na porta ${process.env.PORT}`)
})
