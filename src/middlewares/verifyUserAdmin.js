export const verifyUserAdmin = async (req,res,next)=>{
    const isAdmin = req.user.isAdmin

    if(!isAdmin){
        return res.status(403).json({message:"Você nao tem permissão para executar essa ação"})
    }

    next()

}