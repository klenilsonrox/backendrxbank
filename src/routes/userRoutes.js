import { Router } from "express";
import { registerUserController,loginUserController,getUserController,updateUserController, getAllUsersController, getAllUsersWithAccountsController } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { verifyUserAdmin } from "../middlewares/verifyUserAdmin.js";

const router = Router()

router.get("/users", authMiddleware , getAllUsersController)
router.post('/users/register', registerUserController);
router.post('/users/login', loginUserController);
router.get('/users/me', authMiddleware, getUserController);
router.put('/users/update', authMiddleware, updateUserController);
router.get('/allWithAccounts', authMiddleware, getAllUsersWithAccountsController);


export default router