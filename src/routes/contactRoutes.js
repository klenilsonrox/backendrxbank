import { Router } from "express";
import { deleteContactController, getContactsController, updateContactsController } from "../controllers/contactController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router()

router.get("/contacts", authMiddleware, getContactsController)
router.delete("/contacts/:id", authMiddleware, deleteContactController)
router.put("/contacts/:id", authMiddleware, updateContactsController)

export default router