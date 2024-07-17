import { Router } from "express";
import { deleteContactController, getContactsController, getContactsOnUserController, updateContactsController } from "../controllers/contactController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router()

router.get("/contacts", authMiddleware, getContactsController)
router.get("/mycontacts", authMiddleware, getContactsOnUserController)
router.delete("/contacts/:id", authMiddleware, deleteContactController)
router.put("/contacts/:id", authMiddleware, updateContactsController)

export default router